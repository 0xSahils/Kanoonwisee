const nodemailer = require("nodemailer");
require("dotenv").config();

// Create Brevo (Sendinblue) SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  pool: true,           // ✅ enable SMTP pooling
  maxConnections: 5,    // ✅ not nested inside "pool"
  maxMessages: 100,
  rateDelta: 1000,
  rateLimit: 5,
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

/**
 * Send Email (OTP / Notification)
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} otp - OTP or message body
 */
const sendEmail = async (to, subject, otp) => {
  try {
    console.log("📧 Attempting to send email to:", to);

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 25px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #2563eb; text-align: center;">KanoonWise</h2>
          <p style="font-size: 16px; color: #333;">Hello,</p>
          <p style="font-size: 15px; color: #333;">
            Your One-Time Password (OTP) for authentication is:
          </p>
          <div style="text-align: center; margin: 25px 0;">
            <span style="display: inline-block; font-size: 24px; letter-spacing: 4px; font-weight: bold; background: #2563eb; color: #fff; padding: 10px 25px; border-radius: 8px;">
              ${otp}
            </span>
          </div>
          <p style="font-size: 14px; color: #555;">
            This OTP is valid for the next <b>5 minutes</b>. Please do not share it with anyone.
          </p>
          <p style="font-size: 12px; color: #999; text-align: center; margin-top: 30px;">
            © ${new Date().getFullYear()} KanoonWise. All rights reserved.<br>
            This is an automated email — please do not reply.
          </p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"KanoonWise" <${process.env.SMTP_USER}>`, // ✅ must be verified in Brevo
      to,
      subject,
      html: htmlContent,
    });
    

    console.log(`✅ Email sent successfully to ${to}`);
    console.log("📤 SMTP Response:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Error sending email to:", to);
    console.error("   Error Message:", error.message);
    console.error("   Error Code:", error.code || "N/A");
    console.error("   Error Command:", error.command || "N/A");

    if (error.code === "EAUTH") {
      console.error("🔐 Authentication failed. Verify SMTP_USER and SMTP_PASS in Render environment.");
    } else if (error.code === "ETIMEDOUT" || error.code === "ESOCKET") {
      console.error("⏱️ Network timeout. Verify SMTP_HOST and SMTP_PORT accessibility on Render.");
      console.error("   Current SMTP_HOST:", process.env.SMTP_HOST);
      console.error("   Current SMTP_PORT:", process.env.SMTP_PORT);
    } else if (error.code === "ECONNREFUSED") {
      console.error("❌ Connection refused. SMTP server may be unreachable.");
    } else {
      console.error("❌ Unexpected error:", error);
    }

    throw error;
  }
};

module.exports = sendEmail;
