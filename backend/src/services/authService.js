// services/authService.js

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateOtp } = require("../utils/otpGenerator");
const sendEmail = require("../config/email.js");
const { generateTokens } = require("../utils/jwtHelper");


// ✅ Request OTP
const requestOtp = async (email, role = "lawyer") => {
  try {
    console.log("📩 OTP request received:", email, "Role:", role);

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({ email, role });
      console.log("🆕 User created:", email, "Role:", role);
    } else {
      console.log("👤 Existing user found:", email);
    }

    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);

    user.otp = hashedOtp;
    user.otp_expires = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

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


// ✅ Verify OTP and return tokens
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

    user.otp = null;
    user.otp_expires = null;
    await user.save();

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


// ✅ Refresh token service
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


// ✅ Utility functions used in Controller
const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const getUserById = async (id) => {
  return await User.findByPk(id);
};


// ✅ Export everything
module.exports = {
  requestOtp,
  verifyOtp,
  refreshAccessToken,
  getUserByEmail,
  getUserById,
};
