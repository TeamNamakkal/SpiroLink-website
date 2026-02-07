import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 10000;
const frontendDistPath = join(__dirname, 'frontend', 'dist');

/* ===============================
   MIDDLEWARE
================================ */
app.use(cors());
app.use(express.json());

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
    if (!emailService) {
      return res.status(503).json({
        success: false,
        error: 'Email service not configured',
      });
    }

    const { name, email, phone, serviceType, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required',
      });
    }

    console.log(`📧 Processing contact form from ${email}...`);

    const emailSubject = `New Contact Form - ${serviceType || 'General'}`;
    const companyEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Service:</strong> ${serviceType || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><em>Reply to: ${email}</em></p>
    `;

    const userEmailHtml = `
      <h3>Hello ${name},</h3>
      <p>Thank you for contacting SPIROLINK.</p>
      <p>We have received your message and will get back to you shortly.</p>
      <br>
      <p>Regards,<br>SPIROLINK Team</p>
    `;

    // Send via appropriate service
    if (emailService === 'resend') {
      // Company email via Resend
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'contact@spirolink.com',
        subject: emailSubject,
        html: companyEmailHtml,
      });
      console.log('✅ Company email sent via Resend');

      // Confirmation to user via Resend
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'We received your message - SPIROLINK',
        html: userEmailHtml,
      });
      console.log('✅ User confirmation sent via Resend');
    } else if (emailService === 'smtp') {
      // Company email via SMTP
      await smtpTransporter.sendMail({
        from: `"SPIROLINK" <${process.env.SMTP_USER}>`,
        to: 'contact@spirolink.com',
        subject: emailSubject,
        html: companyEmailHtml,
      });
      console.log('✅ Company email sent via SMTP');

      // Confirmation to user via SMTP
      await smtpTransporter.sendMail({
        from: `"SPIROLINK" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'We received your message - SPIROLINK',
        html: userEmailHtml,
      });
      console.log('✅ User confirmation sent via SMTP');
    }

    res.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('❌ Email error:', error.message);
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
app.listen(PORT, () => {
  console.log('\n====================================');
  console.log('🚀 SPIROLINK - Unified Service');
  console.log(`🌍 Port: ${PORT}`);
  console.log(`📁 Frontend: ${frontendDistPath}`);
  console.log('====================================');
  console.log('\n📍 API Endpoints:');
  console.log('  GET  /api/health');
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
