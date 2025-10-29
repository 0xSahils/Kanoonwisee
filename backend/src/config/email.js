const Brevo = require("@getbrevo/brevo");
require("dotenv").config();

const apiInstance = new Brevo.TransactionalEmailsApi();

// ✅ Correct way to set API key in new Brevo SDK
apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async (to, subject, otp) => {
  try {
    const emailData = {
      sender: {
        name: "KanoonWise",
        email: process.env.SENDER_EMAIL, // ✅ Must be verified sender in Brevo
      },
      to: [{ email: to }],
      subject,
      htmlContent: `
        <div style="font-family: Arial; padding: 20px;">
          <h2 style="color:#2563eb;">KanoonWise</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing:4px;">${otp}</h1>
          <p>This OTP is valid for <b>5 minutes</b>.</p>
        </div>
      `,
    };

    const response = await apiInstance.sendTransacEmail(emailData);

    console.log("✅ Brevo Email Sent:", response.messageId || response);
    return response;
  } catch (error) {
    console.error("❌ Brevo Email Error:", error.response?.body || error.message);
    throw new Error("Failed to send OTP.");
  }
};

module.exports = sendEmail;
