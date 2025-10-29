const nodemailer = require("nodemailer");
require("dotenv").config();

// ✅ Brevo SMTP Transporter Configuration (Production safe)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,                           // ✅ required for Brevo on port 587
  auth: {
    user: process.env.SMTP_USER,          // ✅ Verified Brevo email
    pass: process.env.SMTP_PASS,          // ✅ SMTP KEY (Not Brevo account password)
  },
  tls: {
    rejectUnauthorized: false,            // ✅ Fix for SSL verification issues
  },
  connectionTimeout: 30000,
  socketTimeout: 30000,
});

/**
 * Send Email (OTP / Notification)
 * @param {string} to - Email of recipient
 * @param {string} subject - Subject of Email
 * @param {string} otp - OTP or Message body
 */
const sendEmail = async (to, subject, otp) => {
  try {
    console.log(`📩 OTP request: ${to}`);

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
      from: `"KanoonWise" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log(`✅ Email sent successfully → ${to}`);
    console.log("📬 Response:", info.response);

    return info;
  } catch (error) {
    console.error("❌ Error sending OTP email");
    console.error("   Message:", error.message);
    console.error("   Code:", error.code || "N/A");
    console.error("   Command:", error.command || "N/A");

    if (error.code === "ETIMEDOUT") {
      console.error("⏱️ Connection timeout: SMTP blocked on server.");
    }
    if (error.code === "EAUTH") {
      console.error("🔐 Authentication failed: Incorrect SMTP_USER or SMTP_PASS");
    }

    throw new Error("Failed to send OTP. Please try again.");
  }
};

module.exports = sendEmail;
