require("dotenv").config();
const sendEmail = require("./src/config/email");

async function testGmailEmail() {
  try {
    console.log("🧪 Testing Gmail SMTP configuration...");
    console.log("📧 SMTP Host:", process.env.SMTP_HOST);
    console.log("📧 SMTP User:", process.env.SMTP_USER);
    console.log("📧 Email From:", process.env.EMAIL_FROM);
    console.log("📧 Send Real Emails:", process.env.SEND_REAL_EMAILS);
    console.log("📧 Use Ethereal:", process.env.USE_ETHEREAL_EMAIL);

    // Test with a sample OTP - sending to your own email
    const testOTP = "123456";
    const testEmail = "creature7985@gmail.com"; // Your email

    console.log(`\n📤 Sending test email to: ${testEmail}`);

    await sendEmail(
      testEmail,
      "KanoonWise - Test OTP Code",
      `Your test OTP code is: <strong>${testOTP}</strong><br><br>This is a test email to verify Gmail SMTP is working correctly.`
    );

    console.log("✅ Email test completed successfully!");
    console.log("📬 Check your Gmail inbox for the test email.");
  } catch (error) {
    console.error("❌ Email test failed:", error);
  }
}

testGmailEmail();
