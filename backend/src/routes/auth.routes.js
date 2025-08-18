const express = require('express');
const authController = require('../controllers/authController');
const validateRequest = require('../middlewares/validateRequest');
const { requestOtpSchema, verifyOtpSchema, refreshTokenSchema } = require('../utils/validationSchemas');

const router = express.Router();

router.post('/request-otp', validateRequest(requestOtpSchema), authController.requestOtp);
router.post('/verify-otp', validateRequest(verifyOtpSchema), authController.verifyOtp);
router.post('/refresh', validateRequest(refreshTokenSchema), authController.refreshToken);

module.exports = router;
