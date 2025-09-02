const csrf = require('csrf');
const { setCsrfCookie } = require('../utils/cookieConfig');

// Initialize CSRF tokens
const csrfTokens = csrf();

/**
 * Middleware to generate and set CSRF token
 */
const generateCsrfToken = (req, res, next) => {
  try {
    // Ensure session exists
    if (!req.session) {
      return res.status(500).json({
        message: 'Session not initialized',
        code: 'SESSION_NOT_INITIALIZED'
      });
    }
    
    // Generate CSRF secret if not exists
    if (!req.session.csrfSecret) {
      req.session.csrfSecret = csrfTokens.secretSync();
    }

    // Generate CSRF token
    const csrfToken = csrfTokens.create(req.session.csrfSecret);
    
    // Set CSRF token in cookie for frontend access
    setCsrfCookie(res, csrfToken);
    
    // Also set in response header
    res.set('X-CSRF-Token', csrfToken);
    
    req.csrfToken = csrfToken;
    next();
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return res.status(500).json({
      message: 'Failed to generate CSRF token',
      code: 'CSRF_GENERATION_FAILED'
    });
  }
};

/**
 * Middleware to verify CSRF token for state-changing operations
 */
const verifyCsrfToken = (req, res, next) => {
  try {
    // Skip CSRF check for safe methods
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      return next();
    }

    // Skip CSRF check in development if explicitly disabled
    if (process.env.NODE_ENV === 'development' && process.env.DISABLE_CSRF === 'true') {
      return next();
    }

    const secret = req.session?.csrfSecret;
    if (!secret) {
      return res.status(403).json({
        message: 'CSRF secret not found. Please refresh the page.',
        code: 'CSRF_SECRET_MISSING'
      });
    }

    // Get CSRF token from header or body
    const token = req.headers['x-csrf-token'] || 
                  req.body._csrf || 
                  req.query._csrf;

    if (!token) {
      return res.status(403).json({
        message: 'CSRF token required',
        code: 'CSRF_TOKEN_MISSING'
      });
    }

    // Verify CSRF token
    const isValid = csrfTokens.verify(secret, token);
    if (!isValid) {
      return res.status(403).json({
        message: 'Invalid CSRF token',
        code: 'CSRF_TOKEN_INVALID'
      });
    }

    next();
  } catch (error) {
    console.error('CSRF verification error:', error);
    return res.status(403).json({
      message: 'CSRF verification failed',
      code: 'CSRF_VERIFICATION_FAILED'
    });
  }
};

/**
 * Middleware to setup CSRF protection with session handling
 * This should be applied to routes that need CSRF protection
 */
const csrfProtection = [generateCsrfToken, verifyCsrfToken];

/**
 * Lightweight CSRF token generator (without verification)
 * Use this for endpoints that only need to provide CSRF tokens
 */
const csrfTokenProvider = generateCsrfToken;

module.exports = {
  generateCsrfToken,
  verifyCsrfToken,
  csrfProtection,
  csrfTokenProvider
};
