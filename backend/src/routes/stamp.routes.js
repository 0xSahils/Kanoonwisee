const express = require('express');
const router = express.Router();
const stampController = require('../controllers/stampController');
const { optionalAuthMiddleware } = require('../middlewares/authMiddleware');
const { csrfProtection } = require('../middlewares/csrfMiddleware');
const { validateRequest } = require('../middlewares/validateRequest');
const {
  stampOrderSchema,
  updateServiceSchema,
  validatePromoSchema,
} = require('../utils/validationSchemas');

// Public routes (no auth required)
router.get('/states', stampController.getStates);
router.get('/templates/:state', stampController.getTemplatesByState);
router.get('/promo-codes', stampController.getPromoCodes);
router.get('/verify/:verificationHash', stampController.verifyStamp);

// Order creation (optional auth - supports guest purchases)
// Note: CSRF removed for guest checkout support - validation done by Razorpay
router.post(
  '/orders',
  optionalAuthMiddleware,
  validateRequest(stampOrderSchema),
  stampController.createDraftOrder
);

router.patch(
  '/orders/:orderId/service',
  optionalAuthMiddleware,
  validateRequest(updateServiceSchema),
  stampController.updateServiceSelection
);

router.post(
  '/orders/:orderId/validate-promo',
  optionalAuthMiddleware,
  validateRequest(validatePromoSchema),
  stampController.validatePromoCode
);

router.post(
  '/orders/:orderId/payment',
  optionalAuthMiddleware,
  stampController.createPaymentOrder
);

router.post(
  '/orders/:orderId/verify-payment',
  optionalAuthMiddleware,
  stampController.verifyPaymentAndGenerate
);

router.get('/orders/:orderId', optionalAuthMiddleware, stampController.getOrderDetails);

// Admin routes
router.get('/admin/orders', stampController.getAllOrders);

router.patch(
  '/admin/orders/:orderId/revoke',
  csrfProtection,
  stampController.revokeStamp
);

module.exports = router;
