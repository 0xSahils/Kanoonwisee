const express = require('express');
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { csrfTokenProvider, verifyCsrfToken } = require('../middlewares/csrfMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const { requestOtpSchema, verifyOtpSchema, refreshTokenSchema } = require('../utils/validationSchemas');

const router = express.Router();

// Public routes (no CSRF needed for read operations)
router.post('/request-otp', validateRequest(requestOtpSchema), ...authController.requestOtp);
router.post('/verify-otp', validateRequest(verifyOtpSchema), authController.verifyOtp);
router.post('/refresh', validateRequest(refreshTokenSchema), authController.refreshToken);

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
