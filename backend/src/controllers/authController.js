const authService = require("../services/authService");
const rateLimit = require("express-rate-limit");

// Environment-based rate limiting
const otpLimiter = rateLimit({
  windowMs:
    process.env.NODE_ENV === "production"
      ? 60 * 60 * 1000 // Production: 1 hour
      : 15 * 60 * 1000, // Development: 15 minutes
  max:
    process.env.NODE_ENV === "production"
      ? 5 // Production: 5 requests
      : 20, // Development: 20 requests
  message: {
    message:
      process.env.NODE_ENV === "production"
        ? "Too many OTP requests from this IP, please try again after an hour"
        : "Too many OTP requests from this IP, please wait 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const requestOtp = async (req, res, next) => {
  try {
    const { email, role = "lawyer" } = req.body;
    const result = await authService.requestOtp(email, role);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const tokens = await authService.verifyOtp(email, otp);
    res.status(200).json(tokens);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshAccessToken(refreshToken);
    res.status(200).json(tokens);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  requestOtp: [otpLimiter, requestOtp],
  verifyOtp,
  refreshToken,
};
