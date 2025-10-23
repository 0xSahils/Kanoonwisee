const express = require('express');
const router = express.Router();
const adminStampController = require('../controllers/adminStampController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin role required.' });
  }
  next();
};

// All routes require authentication and admin role
router.use(authMiddleware);
router.use(requireAdmin);

// Stamp Orders Management
router.get('/stamp-orders', adminStampController.getAllOrders);
router.get('/stamp-orders/:orderId', adminStampController.getOrderById);
router.patch('/stamp-orders/:orderId/status', adminStampController.updateOrderStatus);
router.get('/stamp-orders/:orderId/pdf', adminStampController.downloadOrderPDF);

// Stamp Templates Management
router.get('/stamp-templates', adminStampController.getAllTemplates);
router.get('/stamp-templates/:templateId', adminStampController.getTemplateById);
router.post('/stamp-templates', adminStampController.createTemplate);
router.put('/stamp-templates/:templateId', adminStampController.updateTemplate);
router.delete('/stamp-templates/:templateId', adminStampController.deleteTemplate);

// Promo Codes Management
router.get('/promo-codes', adminStampController.getAllPromoCodes);
router.post('/promo-codes', adminStampController.createPromoCode);
router.put('/promo-codes/:promoId', adminStampController.updatePromoCode);
router.delete('/promo-codes/:promoId', adminStampController.deletePromoCode);

// Statistics
router.get('/statistics', adminStampController.getStatistics);

module.exports = router;
