import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { Resend } from "resend";
import nodemailer from "nodemailer";

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
  console.log(`   API Key: ${process.env.RESEND_API_KEY.substring(0, 10)}...`);
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
app.post("/api/contact", async (req, res) => {
  try {
    if (!emailService) {
      return res.status(503).json({
        success: false,
        error: "Email service not configured",
      });
    }

    const { name, email, phone, serviceType, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required",
      });
    }

    console.log(`📧 Sending contact form from ${email}...`);

    if (emailService === "resend") {
      // Resend email
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Email to company
      const companyEmailResponse = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "contact@spirolink.com",
        subject: `New Contact Form - ${serviceType || "General"}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Service:</strong> ${serviceType || "N/A"}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr>
          <p><em>Reply to: ${email}</em></p>
        `,
      });

      console.log(`✅ Company email sent:`, companyEmailResponse);

      // Confirmation email to user
      const userEmailResponse = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "We received your message - SPIROLINK",
        html: `
          <h3>Hello ${name},</h3>
          <p>Thank you for contacting SPIROLINK.</p>
          <p>We have received your message and will get back to you shortly.</p>
          <br>
          <p>Regards,<br>SPIROLINK Team</p>
        `,
      });

      console.log(`✅ User confirmation email sent:`, userEmailResponse);

      res.json({
        success: true,
        message: "Email sent successfully",
        companyEmail: companyEmailResponse,
        userEmail: userEmailResponse,
      });
    } else if (emailService === "smtp") {
      // SMTP email
      const companyEmailHtml = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Service:</strong> ${serviceType || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
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

      // Send email to company
      await mailTransporter.sendMail({
        from: `"SPIROLINK" <${process.env.SMTP_USER}>`,
        to: "contact@spirolink.com",
        subject: `New Contact Form - ${serviceType || "General"}`,
        html: companyEmailHtml,
      });

      console.log(`✅ Company email sent via SMTP`);

      // Send confirmation email to user
      await mailTransporter.sendMail({
        from: `"SPIROLINK" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "We received your message - SPIROLINK",
        html: userEmailHtml,
      });

      console.log(`✅ User confirmation email sent via SMTP`);

      res.json({
        success: true,
        message: "Email sent successfully",
      });
    }
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send email: " + error.message,
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
app.listen(PORT, () => {
  console.log("====================================");
  console.log("🚀 SPIROLINK Backend Running");
  console.log("🌍 Port: " + PORT);
  console.log("📍 API Endpoints:");
  console.log("  GET  /api/health");
  console.log("  POST /api/chat");
  console.log("  POST /api/contact");
  console.log("====================================");
});
