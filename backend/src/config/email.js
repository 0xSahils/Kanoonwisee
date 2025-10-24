const nodemailer = require("nodemailer");
require("dotenv").config();

// Create transporter based on environment
let transporter;

if (process.env.USE_ETHEREAL_EMAIL === "true") {
  // Use Ethereal Email for testing (creates test accounts automatically)
  transporter = nodemailer.createTransporter({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "ethereal.user@ethereal.email",
      pass: "ethereal.pass",
    },
  });
} else {
  // Use configured SMTP
  // Hard-coded to use port 465 with SSL for production reliability (Render blocks port 587)
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true, // SSL for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Connection settings for production
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
    pool: true,
    maxConnections: 5,
    maxMessages: 10,
  });
}

const sendEmail = async (to, subject, text) => {
  // Check if we should send real emails (controlled by SEND_REAL_EMAILS env var)
  const shouldSendRealEmails = process.env.SEND_REAL_EMAILS === "true";

  if (!shouldSendRealEmails) {
    console.log(`[DEV MODE] Email would be sent to: ${to}`);
    console.log(`[DEV MODE] Subject: ${subject}`);
    console.log(`[DEV MODE] Content: ${text}`);
    return; // Skip actual sending when SEND_REAL_EMAILS is not true
  }

  try {
    // Verify transporter configuration before sending (skip in production to avoid delays)
    if (process.env.NODE_ENV !== 'production') {
      await transporter.verify();
    }

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || "noreply@kanoonwise.com",
      to: to,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">KanoonWise</h2>
          <p>${text}</p>
          <p style="color: #666; font-size: 12px;">
            This is an automated email from KanoonWise. Please do not reply to this email.
          </p>
        </div>
      `,
    });

    console.log(`✅ Email sent successfully to ${to}`);

    // If using Ethereal Email, show preview URL
    if (process.env.USE_ETHEREAL_EMAIL === "true") {
      console.log(`📧 Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
  } catch (error) {
    console.error("❌ Error sending email:", error);
    console.log(`[FALLBACK] Email content for ${to}: ${text}`);

    // In production, throw a more descriptive error
    if (process.env.NODE_ENV === "production") {
      const errorMsg = error.code === 'ETIMEDOUT' 
        ? 'Email service connection timeout. Please check SMTP settings and use port 465 with SSL.'
        : `Failed to send email: ${error.message}`;
      throw new Error(errorMsg);
    }
  }
};

module.exports = sendEmail;
