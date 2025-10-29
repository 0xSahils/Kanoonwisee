const nodemailer = require("nodemailer");

// ✅ No dotenv here — must be loaded in server.js only

// ✅ Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: Number(process.env.SMTP_PORT) || 587,  // 587 TLS
  secure: Number(process.env.SMTP_PORT) === 465, // SSL if 465
  auth: {
    user: process.env.SMTP_USER, // Brevo email (must be verified)
    pass: process.env.SMTP_PASS, // Brevo SMTP Key
  },
  pool: true,          // ✅ enable connection pooling
  maxConnections: 5,
  maxMessages: 100,
  connectionTimeout: 30000,
  socketTimeout: 30000,
});

/**
 * Send OTP Email
 */
const sendEmail = async (to, subject, otp) => {
  try {
    console.log("📧 Sending email to:", to);

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 25px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #2563eb; text-align: center;">KanoonWise</h2>
          <p style="font-size: 16px; color: #333;">Hello,</p>
          <p style="font-size: 15px; color: #333;">Here is your OTP for login:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="color: white; background: #2563eb; padding: 10px 20px; border-radius: 8px; font-size: 24px; font-weight: bold;">
              ${otp}
            </span>
          </div>
          <p>This OTP expires in <strong>5 minutes</strong>.</p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"KanoonWise" <${process.env.SMTP_USER}>`, // ✅ Must be verified sender in Brevo
      to,
      subject,
      html: htmlContent,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error;
  }
};

module.exports = sendEmail;
