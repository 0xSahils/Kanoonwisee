const express = require('express');
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { csrfTokenProvider, verifyCsrfToken } = require('../middlewares/csrfMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const { requestOtpSchema, verifyOtpSchema, refreshTokenSchema } = require('../utils/validationSchemas');
const { authRateLimit, refreshRateLimit } = require('../config/security');

const router = express.Router();

// Public routes (no CSRF needed for read operations)
// OTP request already has its own rate limiter in authController
router.post('/request-otp', validateRequest(requestOtpSchema), ...authController.requestOtp);

// Verify OTP (actual login) - protected with auth rate limiter
router.post('/verify-otp', authRateLimit, validateRequest(verifyOtpSchema), authController.verifyOtp);

// Token refresh - protected with refresh rate limiter
router.post('/refresh', refreshRateLimit, validateRequest(refreshTokenSchema), authController.refreshToken);

// CSRF token endpoint (for frontend to get CSRF token)
router.get('/csrf-token', csrfTokenProvider, (req, res) => {
  res.status(200).json({
    message: 'CSRF token generated',
    csrfToken: req.csrfToken
  });
});

// Protected routes with CSRF protection for state-changing operations
router.get('/me', authMiddleware, authController.getCurrentUser);
router.post('/logout', authMiddleware, verifyCsrfToken, authController.logout);

module.exports = router;
