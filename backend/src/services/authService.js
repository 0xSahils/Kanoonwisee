// services/authService.js

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateOtp } = require("../utils/otpGenerator");
import { sendEmail } from "../config/email.js";
const { generateTokens } = require("../utils/jwtHelper");

const requestOtp = async (email, role = "lawyer") => {
  try {
    console.log("📩 OTP request received:", email, "Role:", role);

    // ✅ Find or create user
    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({ email, role });
      console.log("🆕 User created:", email, "Role:", role);
    } else {
      console.log("👤 Existing user found:", email);
    }

    // ✅ Generate OTP
    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);

    user.otp = hashedOtp;
    user.otp_expires = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 minutes
    await user.save();

    // ✅ Send Email
    await sendEmail(
      email,
      "Your OTP Code",
      `✅ Your OTP code is: ${otp}\n\nIt will expire in 5 minutes.`
    );

    console.log("✅ OTP sent successfully to:", email);

    return { success: true, message: "OTP sent successfully to your email." };
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    throw new Error("Failed to send OTP. Please try again.");
  }
};

const verifyOtp = async (email, otp) => {
  try {
    console.log("🔍 Verifying OTP for:", email);

    const user = await User.findOne({ where: { email } });

    if (!user || !user.otp || user.otp_expires < new Date()) {
      console.log("⛔ OTP expired or user not found.");
      throw new Error("OTP expired or invalid.");
    }

    const isValidOtp = await bcrypt.compare(otp, user.otp);

    if (!isValidOtp) {
      console.log("❌ Invalid OTP entered.");
      throw new Error("Invalid OTP.");
    }

    // ✅ Clear OTP from DB after successful verification
    user.otp = null;
    user.otp_expires = null;
    await user.save();

    // ✅ Generate JWT tokens
    const tokens = generateTokens(user);

    console.log("🔑 Login success for:", email);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    throw new Error(error.message || "OTP verification failed.");
  }
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) throw new Error("User not found.");

    return generateTokens(user);
  } catch {
    throw new Error("Invalid or expired refresh token.");
  }
};

module.exports = {
  requestOtp,
  verifyOtp,
  refreshAccessToken,
};
