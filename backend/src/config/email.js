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
  
  // Log configuration for debugging (hide password)
  console.log('📧 Email Configuration:');
  console.log('   SMTP_HOST:', process.env.SMTP_HOST || 'NOT SET');
  console.log('   SMTP_USER:', process.env.SMTP_USER || 'NOT SET');
  console.log('   SMTP_PASS:', process.env.SMTP_PASS ? '***SET***' : 'NOT SET');
  console.log('   Port: 465 (SSL)');
  
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
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
    // Add debug for troubleshooting
    debug: process.env.NODE_ENV === 'production',
    logger: process.env.NODE_ENV === 'production',
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

  // TEMPORARY: If SMTP fails in production, just log the OTP
  // This allows the app to work while you fix email configuration
  if (process.env.DISABLE_EMAIL_SENDING === "true") {
    console.log(`📧 [EMAIL DISABLED] Would send to: ${to}`);
    console.log(`📧 [EMAIL DISABLED] Subject: ${subject}`);
    console.log(`📧 [EMAIL DISABLED] Content: ${text}`);
    console.log(`⚠️  IMPORTANT: Email sending is disabled. Re-enable by removing DISABLE_EMAIL_SENDING env var.`);
    return; // Skip sending but don't throw error
  }

  try {
    // Verify transporter configuration before sending (skip in production to avoid delays)
    if (process.env.NODE_ENV !== 'production') {
      await transporter.verify();
    }

    console.log(`📧 Attempting to send email to ${to}...`);

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
    console.error("   Error code:", error.code);
    console.error("   Error command:", error.command);
    console.log(`[FALLBACK] Email content for ${to}: ${text}`);

    // In production, provide helpful error message
    if (process.env.NODE_ENV === "production") {
      let errorMsg = `Failed to send email: ${error.message}`;
      
      if (error.code === 'ETIMEDOUT') {
        errorMsg = 'Email service connection timeout. Possible causes:\n' +
          '1. SMTP credentials are incorrect\n' +
          '2. Gmail App Password not generated (needs 2FA enabled)\n' +
          '3. Render is blocking outgoing SMTP connections\n' +
          '4. Gmail account has "Less secure app access" disabled\n\n' +
          'TEMPORARY FIX: Add DISABLE_EMAIL_SENDING=true to environment variables to bypass email (OTP will be logged instead)';
      } else if (error.code === 'EAUTH') {
        errorMsg = 'Email authentication failed. Please check:\n' +
          '1. SMTP_USER is your full Gmail address\n' +
          '2. SMTP_PASS is a Gmail App Password (16 characters, no spaces)\n' +
          '3. 2-Step Verification is enabled on your Google Account';
      }
      
      throw new Error(errorMsg);
    }
  }
};

module.exports = sendEmail;
