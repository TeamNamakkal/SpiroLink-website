import nodemailer from 'nodemailer';
import { Resend } from 'resend';

let emailService = null;

/**
 * Initialize email service (Resend or SMTP)
 */
export const initializeEmailService = () => {
  if (process.env.RESEND_API_KEY) {
    emailService = {
      type: 'resend',
      client: new Resend(process.env.RESEND_API_KEY)
    };
    console.log('✅ Email service: Resend');
  } else if (
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  ) {
    emailService = {
      type: 'smtp',
      client: nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      })
    };
    console.log('✅ Email service: SMTP');
  } else {
    console.warn('⚠️  No email service configured (RESEND_API_KEY or SMTP settings)');
  }
};

/**
 * Send Payment Confirmation Email
 */
export const sendPaymentConfirmation = async (paymentData) => {
  const {
    email,
    name,
    amount,
    service_type,
    transaction_id,
    payment_id,
  } = paymentData;

  if (!emailService) {
    console.warn('⚠️  Email service not configured, skipping confirmation email');
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
          .payment-details { background-color: white; padding: 15px; border-radius: 4px; margin: 15px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .detail-label { font-weight: bold; color: #666; }
          .detail-value { text-align: right; }
          .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          .success-badge { display: inline-block; background-color: #10b981; color: white; padding: 8px 12px; border-radius: 4px; margin-bottom: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Confirmation</h1>
            <p>Thank you for your payment!</p>
          </div>
          <div class="content">
            <div class="success-badge">✓ Payment Successful</div>
            
            <p>Hi ${name},</p>
            <p>Your payment has been successfully processed. Below are your payment details:</p>
            
            <div class="payment-details">
              <div class="detail-row">
                <span class="detail-label">Amount:</span>
                <span class="detail-value">$${parseFloat(amount).toFixed(2)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Service:</span>
                <span class="detail-value">${service_type}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value" style="font-family: monospace; font-size: 12px;">${transaction_id}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Payment ID:</span>
                <span class="detail-value" style="font-family: monospace; font-size: 12px;">${payment_id}</span>
              </div>
              <div class="detail-row" style="border-bottom: none;">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            
            <p>Keep this email for your records. Our team will be in touch soon to provide you with the services details and next steps.</p>
            
            <p><strong>Questions?</strong> Contact us at support@spirolink.com</p>
          </div>
          <div class="footer">
            <p>© SPIROLINK – Network Design & Engineering Excellence</p>
            <p>This is an automated email. Please do not reply directly.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
Payment Confirmation

Thank you for your payment!

Amount: $${parseFloat(amount).toFixed(2)}
Service: ${service_type}
Transaction ID: ${transaction_id}
Payment ID: ${payment_id}
Date: ${new Date().toLocaleString()}

Keep this email for your records.

© SPIROLINK – Network Design & Engineering Excellence
  `;

  try {
    if (emailService.type === 'resend') {
      await emailService.client.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: email,
        subject: 'Payment Confirmation - SPIROLINK',
        html: htmlContent,
        text: textContent,
      });
    } else if (emailService.type === 'smtp') {
      await emailService.client.sendMail({
        from: process.env.SMTP_FROM_EMAIL || 'noreply@spirolink.com',
        to: email,
        subject: 'Payment Confirmation - SPIROLINK',
        html: htmlContent,
        text: textContent,
      });
    }

    console.log(`✅ Confirmation email sent to ${email}`);
  } catch (error) {
    console.error(`❌ Failed to send confirmation email to ${email}:`, error.message);
    throw error;
  }
};

/**
 * Send Payment Failed Email
 */
export const sendPaymentFailedEmail = async (paymentData) => {
  const { email, name, amount, service_type, error_message } = paymentData;

  if (!emailService) {
    console.warn('⚠️  Email service not configured');
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #dc2626; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background-color: #fef2f2; padding: 20px; border-radius: 0 0 8px 8px; }
          .detail-row { padding: 8px 0; }
          .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Failed</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Unfortunately, your payment could not be processed.</p>
            
            <div class="detail-row"><strong>Amount:</strong> $${parseFloat(amount).toFixed(2)}</div>
            <div class="detail-row"><strong>Service:</strong> ${service_type}</div>
            <div class="detail-row"><strong>Reason:</strong> ${error_message}</div>
            
            <p>Please try again or contact support if you need assistance.</p>
          </div>
          <div class="footer">
            <p>© SPIROLINK</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    if (emailService.type === 'resend') {
      await emailService.client.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'noreply@spirolink.com',
        to: email,
        subject: 'Payment Failed - SPIROLINK',
        html: htmlContent,
      });
    }
    console.log(`ℹ️  Payment failed notification sent to ${email}`);
  } catch (error) {
    console.error(`❌ Failed to send payment failed email:`, error.message);
  }
};

export default {
  initializeEmailService,
  sendPaymentConfirmation,
  sendPaymentFailedEmail,
};
