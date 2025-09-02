const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Authentication middleware that extracts JWT from httpOnly cookies
 * Fully cookie-based authentication - no header fallback
 */
const authMiddleware = (req, res, next) => {
  let token = null;

  // Get token from httpOnly cookie only
  if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return res.status(401).json({ 
      message: "Authentication token required",
      code: "AUTH_TOKEN_MISSING"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    // Token is always from cookie in this implementation
    req.tokenSource = 'cookie';
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: "Token has expired",
        code: "AUTH_TOKEN_EXPIRED"
      });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: "Invalid token",
        code: "AUTH_TOKEN_INVALID"
      });
    } else {
      console.error('Auth middleware error:', error);
      return res.status(401).json({ 
        message: "Authentication failed",
        code: "AUTH_FAILED"
      });
    }
  }
};

/**
 * Optional authentication middleware - doesn't fail if no token provided
 * Useful for endpoints that work for both authenticated and anonymous users
 */
const optionalAuthMiddleware = (req, res, next) => {
  let token = null;

  // Only check httpOnly cookies
  if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      req.tokenSource = 'cookie';
    } catch (error) {
      // Silently ignore token errors for optional auth
      req.user = null;
    }
  }

  next();
};

module.exports = {
  authMiddleware,
  optionalAuthMiddleware
};
