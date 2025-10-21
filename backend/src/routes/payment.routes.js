const express = require('express');
const paymentController = require('../controllers/paymentController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { verifyCsrfToken } = require('../middlewares/csrfMiddleware');
const { validateRequest } = require('../middlewares/validateRequest');
const { 
  createOrderSchema, 
  verifyPaymentSchema 
} = require('../utils/validationSchemas');

const router = express.Router();

// Webhook endpoint (no auth or CSRF needed, Razorpay will verify)
// Must be defined before other routes to avoid conflicts
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleWebhook);

// Public routes
router.get('/packages', paymentController.getPackages);

// Protected routes (require authentication)
router.use(authMiddleware); // Apply auth middleware to all routes below

// State-changing operations require CSRF protection
router.post(
  '/create-order',
  verifyCsrfToken,
  validateRequest(createOrderSchema),
  paymentController.createOrder
);

router.post(
  '/verify-payment',
  verifyCsrfToken,
  validateRequest(verifyPaymentSchema),
  paymentController.verifyPayment
);

// Read operations (no CSRF needed)
router.get('/orders', paymentController.getUserOrders);
router.get('/orders/:orderId', paymentController.getOrderDetails);

module.exports = router;