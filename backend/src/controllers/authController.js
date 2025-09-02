const authService = require("../services/authService");
const sessionService = require("../services/sessionService");
const { setAuthCookies, clearAuthCookies } = require("../utils/cookieConfig");
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
    
    // Get user information for session creation
    const user = await authService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    // Create session in database
    const sessionData = await sessionService.createSession(
      user.id,
      tokens.refreshToken,
      req.ip,
      req.headers['user-agent']
    );
    
    // Set httpOnly cookies
    setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
    
    // Return user data without tokens (they're now in cookies)
    res.status(200).json({
      message: "Authentication successful",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      },
      sessionId: sessionData.sessionId
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(401).json({ message: error.message });
  }
};

const refreshToken = async (req, res, next) => {
  try {
    // Extract refresh token from cookie
    const refreshTokenFromCookie = req.cookies?.refreshToken;
    
    // Fallback to body for backward compatibility
    const refreshTokenFromBody = req.body?.refreshToken;
    
    const refreshToken = refreshTokenFromCookie || refreshTokenFromBody;
    
    if (!refreshToken) {
      return res.status(401).json({ 
        message: "Refresh token not provided",
        code: "REFRESH_TOKEN_MISSING"
      });
    }

    // Verify session exists and is valid
    const session = await sessionService.getSessionByToken(refreshToken);
    if (!session) {
      clearAuthCookies(res);
      return res.status(401).json({ 
        message: "Invalid session",
        code: "INVALID_SESSION"
      });
    }

    // Generate new tokens
    const tokens = await authService.refreshAccessToken(refreshToken);
    
    // Update session with new refresh token
    await sessionService.updateSession(session.sessionId, tokens.refreshToken);
    
    // Set new cookies
    setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
    
    res.status(200).json({
      message: "Tokens refreshed successfully",
      accessToken: tokens.accessToken // Still return access token for immediate use
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    clearAuthCookies(res);
    res.status(401).json({ 
      message: error.message,
      code: "TOKEN_REFRESH_FAILED"
    });
  }
};

// Logout endpoint to clear session and cookies
const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const userId = req.user?.id;
    
    if (refreshToken && userId) {
      // Remove session from database
      await sessionService.removeSessionByToken(refreshToken);
    }
    
    // Clear cookies
    clearAuthCookies(res);
    
    res.status(200).json({
      message: "Logged out successfully"
    });
  } catch (error) {
    console.error('Logout error:', error);
    // Still clear cookies even if database operation fails
    clearAuthCookies(res);
    res.status(200).json({
      message: "Logged out successfully"
    });
  }
};

// Get current user endpoint
const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        message: "User not authenticated",
        code: "USER_NOT_AUTHENTICATED"
      });
    }

    const user = await authService.getUserById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        code: "USER_NOT_FOUND"
      });
    }

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    next(error);
  }
};

module.exports = {
  requestOtp: [otpLimiter, requestOtp],
  verifyOtp,
  refreshToken,
  logout,
  getCurrentUser,
};
