const SibApiV3Sdk = require("@getbrevo/brevo");
require("dotenv").config();

const client = new SibApiV3Sdk.TransactionalEmailsApi();
client.authentications["apiKey"].apiKey = process.env.BREVO_API_KEY;

/**
 * Send OTP Email via Brevo API (No SMTP)
 */
const sendEmail = async (to, subject, otp) => {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif">
        <h2>KanoonWise</h2>
        <p>Your OTP is:</p>
        <h1 style="letter-spacing: 4px">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      </div>
    `;

    const emailData = {
      sender: {
        name: "KanoonWise",
        email: process.env.SENDER_EMAIL, // must be your Brevo verified email
      },
      to: [{ email: to }],
      subject,
      htmlContent,
    };

    const response = await client.sendTransacEmail(emailData);
    console.log("✅ Email sent successfully:", response.messageId || "OK");
    return response;
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error("Failed to send OTP. Try again.");
  }
};

module.exports = sendEmail;
