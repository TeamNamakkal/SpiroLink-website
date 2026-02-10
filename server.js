import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import * as usersDb from './chatbot-backend/db/users.js';
import { initializeDatabase } from './chatbot-backend/config/initDb.js';
import paymentRoutes from './chatbot-backend/routes/payment.js';
import { initializeEmailService } from './chatbot-backend/lib/emailService.js';

dotenv.config();

// Ensure DATABASE_URL is set for PostgreSQL connection
if (!process.env.DATABASE_URL) {
  // Fallback to internal Render PostgreSQL URL if not set
  process.env.DATABASE_URL = 'postgresql://spiro_postgres_user:wzKR5jnH7o8kc8oF91qnrH7duL4DbwN9@dpg-d63ddma4d50c73dk98kg-a.c.render-internal.com:5432/spiro_postgres';
  console.log('⚠️  DATABASE_URL not found in environment, using default Render PostgreSQL URL');
}

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 10000;
const frontendDistPath = join(__dirname, 'frontend', 'dist');

/* ===============================
   MIDDLEWARE
================================ */
app.use(cors());
const jsonParser = express.json();
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api/payment/stripe/webhook')) {
    return next();
  }
  return jsonParser(req, res, next);
});

// Serve static files from frontend/dist
app.use(express.static(frontendDistPath));

/* ===============================
   OPENAI INITIALIZATION
================================ */
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log('✅ OpenAI initialized');
} else {
  console.warn('⚠️  OPENAI_API_KEY not configured - chatbot disabled');
}

/* ===============================
   EMAIL CONFIGURATION (RESEND or SMTP)
================================ */
let resend = null;
let smtpTransporter = null;
let emailService = null;

// Option 1: RESEND
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
  emailService = 'resend';
  console.log('✅ Resend email service initialized');
}

// Option 2: SMTP (Gmail or other)
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  smtpTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true' || false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  emailService = 'smtp';
  console.log(`✅ SMTP email service initialized (${process.env.SMTP_HOST})`);
}

if (!emailService) {
  console.warn('⚠️  No email service configured - email disabled');
}

/* ===============================
   API ROUTES
================================ */

// Initialize chatbot-backend email service (used by payment webhooks)
initializeEmailService();

// Payment routes (Stripe, status polling, webhook)
app.use('/api/payment', paymentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'SPIROLINK',
    environment: process.env.NODE_ENV || 'development',
    openaiConfigured: !!process.env.OPENAI_API_KEY,
    emailService: emailService || 'not configured',
  });
});

/* ===============================
   AUTHENTICATION ENDPOINTS
================================ */

// Sign Up - Create new user account
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, username, password, first_name, last_name, phone, country, company_name } = req.body;

    // Validation
    if (!email || !username || !password) {
      return res.status(400).json({
        success: false,
        error: "Email, username, and password are required"
      });
    }

    // Check if user already exists
    const existingEmail = await usersDb.getUserByEmail(email);
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        error: "Email already registered"
      });
    }

    const existingUsername = await usersDb.getUserByUsername(username);
    if (existingUsername) {
      return res.status(409).json({
        success: false,
        error: "Username already taken"
      });
    }

    // Create user
    const newUser = await usersDb.createUser({
      email,
      username,
      password,
      first_name,
      last_name,
      phone,
      country,
      company_name
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: newUser
    });
  } catch (error) {
    console.error("Sign up error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Sign up failed"
    });
  }
});

// Sign In - Verify user credentials
app.post("/api/auth/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required"
      });
    }

    // Get user by email
    const user = await usersDb.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password"
      });
    }

    // Verify password
    const isPasswordValid = usersDb.verifyPassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password"
      });
    }

    // Check if account is active
    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        error: "Account has been deactivated"
      });
    }

    // Update last login
    await usersDb.updateLastLogin(user.id);

    res.json({
      success: true,
      message: "Sign in successful",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        full_name: user.full_name,
        is_verified: user.is_verified
      }
    });
  } catch (error) {
    console.error("Sign in error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Sign in failed"
    });
  }
});

// Get user profile by ID
app.get("/api/auth/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await usersDb.getUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch profile"
    });
  }
});

// Update user profile
app.put("/api/auth/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { first_name, last_name, phone, company_name, country, bio, profile_picture } = req.body;

    const updatedUser = await usersDb.updateUserProfile(userId, {
      first_name,
      last_name,
      phone,
      company_name,
      country,
      bio,
      profile_picture
    });

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to update profile"
    });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({
        success: false,
        error: 'OpenAI service not configured',
      });
    }

    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Message is required',
      });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant for SPIROLINK, a broadband infrastructure company.',
        },
        { role: 'user', content: message.trim() },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({
        success: false,
        error: 'No response from OpenAI',
      });
    }

    res.json({ success: true, reply });
  } catch (error) {
    console.error('❌ Chat error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    // Correlate logs for this request without storing personal data long-term
    const requestId = req.headers['x-request-id'] || crypto.randomUUID();

    if (!emailService) {
      return res.status(503).json({
        success: false,
        error: 'Email service not configured',
      });
    }

    const { name, email, phone, serviceType, message } = req.body;

    // Basic validation (backend must not trust the frontend)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required',
      });
    }

    if (!emailRegex.test(String(email))) {
      return res.status(400).json({
        success: false,
        error: 'A valid email is required',
      });
    }

    // Verified sender for Resend (must match your verified domain)
    // Verified sender (Resend domain spirolink.com must be verified)
    const FROM_EMAIL = 'SpiroLink <contact@spirolink.com>';
    // Admin/company recipient (configure in env for production)
    const ADMIN_EMAIL = process.env.COMPANY_EMAIL || process.env.ADMIN_EMAIL || 'contact@spirolink.com';

    // Escape user-provided values to avoid HTML injection in emails
    const escapeHtml = (value) =>
      String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const safeName = escapeHtml(name);
    const safeEmail = String(email).trim().toLowerCase();
    const safePhone = phone ? escapeHtml(phone) : 'N/A';
    const safeServiceType = escapeHtml(serviceType || 'General');
    const safeMessageHtml = escapeHtml(message).replace(/\n/g, '<br>');

    console.log(`📧 [${requestId}] Processing contact form submission`);

    const emailSubject = `New Contact Form - ${safeServiceType}`;
    const companyEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
      <p><strong>Phone:</strong> ${safePhone}</p>
      <p><strong>Service:</strong> ${safeServiceType}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessageHtml}</p>
      <hr>
      <p><em>Reply to: ${escapeHtml(safeEmail)}</em></p>
    `;

    const userEmailHtml = `
      <h3>Hello ${safeName},</h3>
      <p>Thank you for contacting SPIROLINK.</p>
      <p>We have received your message and will get back to you shortly.</p>
      <br>
      <p>Regards,<br>SPIROLINK Team</p>
    `;

    // Send via appropriate service
    if (emailService === 'resend') {
      // Send BOTH emails, and only return success after BOTH complete
      await Promise.all([
        // Admin notification email
        resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          // So you can reply directly to the user from the admin email
          replyTo: safeEmail,
          subject: emailSubject,
          html: companyEmailHtml,
        }),
        // User confirmation email (sent to the email provided in req.body.email)
        resend.emails.send({
          from: FROM_EMAIL,
          to: safeEmail,
          subject: 'We received your message - SPIROLINK',
          html: userEmailHtml,
        }),
      ]);

      console.log(`✅ [${requestId}] Admin + user emails sent via Resend`);
    } else if (emailService === 'smtp') {
      // SMTP fallback (kept for local/dev). Note: FROM_EMAIL must be allowed by your SMTP provider.
      const smtpFrom = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
      await Promise.all([
        smtpTransporter.sendMail({
          from: `"SPIROLINK" <${smtpFrom}>`,
          to: ADMIN_EMAIL,
          replyTo: safeEmail,
          subject: emailSubject,
          html: companyEmailHtml,
        }),
        smtpTransporter.sendMail({
          from: `"SPIROLINK" <${smtpFrom}>`,
          to: safeEmail,
          subject: 'We received your message - SPIROLINK',
          html: userEmailHtml,
        }),
      ]);

      console.log(`✅ [${requestId}] Admin + user emails sent via SMTP`);
    }

    res.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('❌ Email error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send email: ' + error.message,
    });
  }
});

/* ===============================
   SPA FALLBACK (using regex for catch-all)
   Send index.html for non-API routes
   (React Router handles client-side routing)
================================ */
app.get(/.*/, (req, res) => {
  const indexPath = join(frontendDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({
      success: false,
      error: 'Frontend build not found. Run: npm run build',
    });
  }
});

/* ===============================
   ERROR HANDLER
================================ */
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.message);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

/* ===============================
   START SERVER
================================ */
app.listen(PORT, async () => {
  console.log('\n====================================');
  console.log('🚀 SPIROLINK - Unified Service');
  console.log(`🌍 Port: ${PORT}`);
  console.log(`📁 Frontend: ${frontendDistPath}`);
  
  // Initialize database
  try {
    await initializeDatabase();
    console.log('✅ Database initialized');
  } catch (err) {
    console.error('❌ Database initialization error:', err.message);
  }
  
  console.log('====================================');
  console.log('\n📍 API Endpoints:');
  console.log('  GET  /api/health');
  console.log('  POST /api/auth/signup');
  console.log('  POST /api/auth/signin');
  console.log('  GET  /api/auth/profile/:userId');
  console.log('  PUT  /api/auth/profile/:userId');
  console.log('  POST /api/chat');
  console.log('  POST /api/contact');
  console.log('  GET  /* (Frontend Routes)');
  console.log('====================================\n');

  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️  OPENAI_API_KEY not set - chatbot disabled');
  }
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️  RESEND_API_KEY not set - email disabled');
  }
});
