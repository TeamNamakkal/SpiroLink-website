import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import Razorpay from "razorpay";
import Stripe from "stripe";
import crypto from "crypto";
import { initializeDatabase } from "./config/initDb.js";
import * as usersDb from "./db/users.js";
import paymentRoutes from "./routes/payment.js";
import { initializeEmailService } from "./lib/emailService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ===============================
   MIDDLEWARE
================================ */
app.use(cors({ origin: true }));
app.use(express.json());

/* ===============================
   OPENAI INITIALIZATION
================================ */
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY missing");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* ===============================
   EMAIL SERVICE (RESEND or SMTP)
================================ */
let emailService = null;
let mailTransporter = null;

if (process.env.RESEND_API_KEY) {
  console.log("✅ Email service initialized with Resend");
  emailService = "resend";
} else if (
  process.env.SMTP_HOST &&
  process.env.SMTP_PORT &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS
) {
  console.log("✅ Email transporter initialized with SMTP");
  console.log(`   Service: ${process.env.SMTP_SERVICE || "custom"}`);
  console.log(`   Host: ${process.env.SMTP_HOST}`);
  console.log(`   Port: ${process.env.SMTP_PORT}`);
  console.log(`   Secure: ${process.env.SMTP_SECURE === "true"}`);
  console.log(`   User: ${process.env.SMTP_USER}`);

  mailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  emailService = "smtp";
} else {
  console.warn("⚠️  SMTP credentials not fully configured - email functionality disabled");
  console.warn("   SMTP_HOST: " + (process.env.SMTP_HOST ? "✅" : "MISSING"));
  console.warn("   SMTP_PORT: " + (process.env.SMTP_PORT ? "✅" : "MISSING"));
  console.warn("   SMTP_USER: " + (process.env.SMTP_USER ? "✅" : "MISSING"));
  console.warn("   SMTP_PASS: " + (process.env.SMTP_PASS ? "✅" : "MISSING"));
}

/* ===============================
   RAZORPAY INITIALIZATION
================================ */
let razorpayInstance = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  console.log("✅ Razorpay initialized");
  console.log(`   Key ID: ${process.env.RAZORPAY_KEY_ID.substring(0, 10)}...`);
} else {
  console.warn("⚠️  Razorpay credentials not configured");
  console.warn("   RAZORPAY_KEY_ID: " + (process.env.RAZORPAY_KEY_ID ? "✅" : "MISSING"));
  console.warn("   RAZORPAY_KEY_SECRET: " + (process.env.RAZORPAY_KEY_SECRET ? "✅" : "MISSING"));
}

/* ===============================
   STRIPE INITIALIZATION
================================ */
let stripeInstance = null;

if (process.env.STRIPE_SECRET_KEY) {
  stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  console.log("✅ Stripe initialized");
  console.log(`   Secret Key: ${process.env.STRIPE_SECRET_KEY.substring(0, 10)}...`);
} else {
  console.warn("⚠️  Stripe credentials not configured");
  console.warn("   STRIPE_SECRET_KEY: " + (process.env.STRIPE_SECRET_KEY ? "✅" : "MISSING"));
}

/* ===============================
   INITIALIZE SERVICES
================================ */
initializeEmailService();

/* ===============================
   PAYMENT ROUTES (Real-time Stripe)
================================ */
app.use('/api/payment', paymentRoutes);

/* ===============================
   HEALTH CHECK
================================ */
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    backend: "SPIROLINK",
    emailService: emailService || "none",
    emailConfigured: !!emailService,
    openaiConfigured: !!process.env.OPENAI_API_KEY,
  });
});

/* ===============================
   DATABASE TEST ENDPOINT
================================ */
app.get("/api/test-db", async (req, res) => {
  try {
    // Import the database connection
    const pool = (await import('./config/db.js')).default;
    
    const result = await pool.query("SELECT NOW()");
    res.json({
      success: true,
      message: "✅ PostgreSQL connected successfully",
      timestamp: result.rows[0]?.now,
      data: result.rows[0]
    });
  } catch (error) {
    console.error("❌ Database error:", error);
    res.status(500).json({
      success: false,
      error: "Database connection failed",
      details: error.message
    });
  }
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

/* ===============================
   CHAT ENDPOINT
================================ */
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant for SPIROLINK, a broadband infrastructure company.",
        },
        { role: "user", content: message.trim() },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({
        success: false,
        error: "No response from OpenAI",
      });
    }

    res.json({ success: true, reply });
  } catch (error) {
    console.error("❌ Chat error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* ===============================
   CONTACT FORM (EMAIL)
================================ */
// NOTE: In production we deploy the unified service (root server.js) which serves the frontend
// and handles /api/contact. Keeping a second /api/contact implementation here increases the
// chance of deploying the wrong service and breaking relative `/api/*` calls.

/* ===============================
   PAYMENT ENDPOINTS
================================ */

// Create Order
app.post("/api/payment/create-order", async (req, res) => {
  try {
    if (!razorpayInstance) {
      return res.status(503).json({
        success: false,
        error: "Payment service not configured",
      });
    }

    const { amount, currency, receipt, customer, description } = req.body;

    if (!amount || !currency || !receipt) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: amount, currency, receipt",
      });
    }

    if (amount < 100) {
      return res.status(400).json({
        success: false,
        error: "Minimum amount is 100 paise (₹1)",
      });
    }

    const orderData = {
      amount,
      currency,
      receipt,
      notes: {
        customer_name: customer?.name || "Guest",
        // IMPORTANT: only use the user-provided email; don't default to a company/Gmail address
        customer_email: customer?.email ? String(customer.email).trim().toLowerCase() : "",
        customer_contact: customer?.contact || "",
        description: description || "SPIROLINK Service Payment",
      },
    };

    const order = await razorpayInstance.orders.create(orderData);

    console.log(`✅ Payment order created: ${order.id}`);

    res.json({
      success: true,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      customer_id: order.customer_id || null,
    });
  } catch (error) {
    console.error("❌ Order creation error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create payment order: " + error.message,
    });
  }
});

// Verify Payment
app.post("/api/payment/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: "Missing payment verification details",
      });
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.warn(`❌ Payment signature mismatch for order: ${razorpay_order_id}`);
      return res.status(400).json({
        success: false,
        error: "Payment signature verification failed",
      });
    }

    // Fetch payment details to get order details
    const payment = await razorpayInstance.payments.fetch(razorpay_payment_id);

    console.log(`✅ Payment verified successfully: ${razorpay_payment_id}`);
    console.log(`   Order: ${razorpay_order_id}`);
    console.log(`   Amount: ₹${payment.amount / 100}`);
    console.log(`   Status: ${payment.status}`);

    // Send confirmation email
    if (payment.notes && payment.notes.customer_email && emailService) {
      const customerName = payment.notes.customer_name || "Customer";
      const customerEmail = payment.notes.customer_email;
      const amount = payment.amount / 100;

      const emailHtml = `
        <h2>Payment Confirmed!</h2>
        <p>Hello ${customerName},</p>
        <p>Your payment has been successfully processed and confirmed in real-time.</p>
        <br>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
          <p><strong>Transaction Details:</strong></p>
          <p>Amount: ₹${amount}</p>
          <p>Payment ID: ${razorpay_payment_id}</p>
          <p>Order ID: ${razorpay_order_id}</p>
          <p>Status: Confirmed</p>
          <p>Time: ${new Date().toLocaleString()}</p>
        </div>
        <br>
        <p>Thank you for choosing SPIROLINK!</p>
        <p>If you have any questions, please contact us at contact@spirolink.com</p>
        <br>
        <p>Regards,<br>SPIROLINK Team</p>
      `;

      if (emailService === "resend") {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const adminEmail =
          process.env.COMPANY_EMAIL || process.env.ADMIN_EMAIL || "contact@spirolink.com";

        // Send BOTH emails: user receipt + admin notification
        await Promise.all([
          resend.emails.send({
            from: "SpiroLink <contact@spirolink.com>",
            to: customerEmail,
            subject: `Payment Confirmed - ₹${amount} - SPIROLINK`,
            html: emailHtml,
          }),
          resend.emails.send({
            from: "SpiroLink <contact@spirolink.com>",
            to: adminEmail,
            replyTo: customerEmail,
            subject: `Payment Confirmed (Admin Copy) - ₹${amount} - SPIROLINK`,
            html: emailHtml,
          }),
        ]);
        console.log(`✅ Payment confirmation email sent via Resend`);
      } else if (emailService === "smtp") {
        await mailTransporter.sendMail({
          from: `"SPIROLINK" <${process.env.SMTP_USER}>`,
          to: customerEmail,
          subject: `Payment Confirmed - ₹${amount} - SPIROLINK`,
          html: emailHtml,
        });
        console.log(`✅ Payment confirmation email sent via SMTP`);
      }
    }

    res.json({
      success: true,
      message: "Payment verified successfully",
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      amount: payment.amount / 100,
      currency: payment.currency,
      status: payment.status,
      method: payment.method,
    });
  } catch (error) {
    console.error("❌ Payment verification error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to verify payment: " + error.message,
    });
  }
});

// Get Payment Status
app.get("/api/payment/status/:payment_id", async (req, res) => {
  try {
    if (!razorpayInstance) {
      return res.status(503).json({
        success: false,
        error: "Payment service not configured",
      });
    }

    const { payment_id } = req.params;

    const payment = await razorpayInstance.payments.fetch(payment_id);

    res.json({
      success: true,
      payment_id: payment.id,
      amount: payment.amount / 100,
      currency: payment.currency,
      status: payment.status,
      method: payment.method,
      created_at: new Date(payment.created_at * 1000).toISOString(),
    });
  } catch (error) {
    console.error("❌ Payment status error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch payment status: " + error.message,
    });
  }
});

/* ===============================
   STRIPE PAYMENT ENDPOINTS
================================ */

// Create Payment Intent
app.post("/api/payment/stripe/create-intent", async (req, res) => {
  try {
    if (!stripeInstance) {
      return res.status(503).json({
        success: false,
        error: "Stripe payment service not configured",
      });
    }

    const { amount, currency, customer, description } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: amount, currency",
      });
    }

    if (amount < 1) {
      return res.status(400).json({
        success: false,
        error: "Minimum amount is $1",
      });
    }

    // Amount must be in cents for Stripe
    const amountInCents = Math.round(amount * 100);

    const intentData = {
      amount: amountInCents,
      currency: currency.toLowerCase(),
      payment_method_types: ["card"],
      metadata: {
        customer_name: customer?.name || "Guest",
        // IMPORTANT: only use the user-provided email; don't default to a company/Gmail address
        customer_email: customer?.email ? String(customer.email).trim().toLowerCase() : "",
        customer_contact: customer?.contact || "",
        description: description || "SPIROLINK Service Payment",
      },
    };

    if (customer?.email) {
      intentData.receipt_email = customer.email;
    }

    const paymentIntent = await stripeInstance.paymentIntents.create(intentData);

    console.log(`✅ Stripe payment intent created: ${paymentIntent.id}`);

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
    });
  } catch (error) {
    console.error("❌ Stripe payment intent error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create payment intent: " + error.message,
    });
  }
});

// Verify Stripe Payment
app.post("/api/payment/stripe/verify-payment", async (req, res) => {
  try {
    if (!stripeInstance) {
      return res.status(503).json({
        success: false,
        error: "Stripe payment service not configured",
      });
    }

    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        error: "Missing payment intent ID",
      });
    }

    // Retrieve payment intent
    const paymentIntent = await stripeInstance.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        success: false,
        error: `Payment not completed. Status: ${paymentIntent.status}`,
      });
    }

    console.log(`✅ Stripe payment verified successfully: ${paymentIntentId}`);
    console.log(`   Amount: $${paymentIntent.amount / 100}`);
    console.log(`   Status: ${paymentIntent.status}`);

    // Send confirmation email
    const customerEmail = paymentIntent.metadata?.customer_email;
    const customerName = paymentIntent.metadata?.customer_name || "Customer";
    const amount = paymentIntent.amount / 100;

    if (customerEmail && emailService) {
      const emailHtml = `
        <h2>Payment Confirmed!</h2>
        <p>Hello ${customerName},</p>
        <p>Your payment has been successfully processed and confirmed in real-time.</p>
        <br>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
          <p><strong>Transaction Details:</strong></p>
          <p>Amount: $${amount}</p>
          <p>Payment Intent ID: ${paymentIntentId}</p>
          <p>Status: Confirmed</p>
          <p>Time: ${new Date().toLocaleString()}</p>
        </div>
        <br>
        <p>Thank you for choosing SPIROLINK!</p>
        <p>If you have any questions, please contact us at contact@spirolink.com</p>
        <br>
        <p>Regards,<br>SPIROLINK Team</p>
      `;

      if (emailService === "resend") {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const adminEmail =
          process.env.COMPANY_EMAIL || process.env.ADMIN_EMAIL || "contact@spirolink.com";

        // Send BOTH emails: user receipt + admin notification
        await Promise.all([
          resend.emails.send({
            from: "SpiroLink <contact@spirolink.com>",
            to: customerEmail,
            subject: `Payment Confirmed - $${amount} - SPIROLINK`,
            html: emailHtml,
          }),
          resend.emails.send({
            from: "SpiroLink <contact@spirolink.com>",
            to: adminEmail,
            replyTo: customerEmail,
            subject: `Payment Confirmed (Admin Copy) - $${amount} - SPIROLINK`,
            html: emailHtml,
          }),
        ]);
        console.log(`✅ Payment confirmation email sent via Resend`);
      } else if (emailService === "smtp") {
        await mailTransporter.sendMail({
          from: `"SPIROLINK" <${process.env.SMTP_USER}>`,
          to: customerEmail,
          subject: `Payment Confirmed - $${amount} - SPIROLINK`,
          html: emailHtml,
        });
        console.log(`✅ Payment confirmation email sent via SMTP`);
      }
    }

    res.json({
      success: true,
      message: "Payment verified successfully",
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency.toUpperCase(),
      status: paymentIntent.status,
    });
  } catch (error) {
    console.error("❌ Stripe payment verification error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to verify payment: " + error.message,
    });
  }
});

/* ===============================
   404 HANDLER
================================ */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Not found",
  });
});

/* ===============================
   START SERVER
================================ */
app.listen(PORT, async () => {
  console.log("====================================");
  console.log("🚀 SPIROLINK Backend Running");
  console.log("🌍 Port: " + PORT);
  
  // Initialize database
  try {
    await initializeDatabase();
    console.log("✅ Database initialized");
  } catch (err) {
    console.error("❌ Database initialization error:", err.message);
  }
  
  console.log("📍 API Endpoints:");
  console.log("  GET  /api/health");
  console.log("  POST /api/auth/signup");
  console.log("  POST /api/auth/signin");
  console.log("  GET  /api/auth/profile/:userId");
  console.log("  PUT  /api/auth/profile/:userId");
  console.log("  POST /api/chat");
  console.log("  POST /api/contact");
  console.log("  POST /api/payment/create-order");
  console.log("  POST /api/payment/verify-payment");
  console.log("  GET  /api/payment/status/:payment_id");
  console.log("  POST /api/payment/stripe/create-intent");
  console.log("  POST /api/payment/stripe/verify-payment");
  console.log("====================================");
});
