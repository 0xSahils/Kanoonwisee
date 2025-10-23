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
router.post(
  '/orders',
  optionalAuthMiddleware,
  csrfProtection,
  validateRequest(stampOrderSchema),
  stampController.createDraftOrder
);

router.patch(
  '/orders/:orderId/service',
  optionalAuthMiddleware,
  csrfProtection,
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
  csrfProtection,
  stampController.createPaymentOrder
);

router.post(
  '/orders/:orderId/verify-payment',
  optionalAuthMiddleware,
  csrfProtection,
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
