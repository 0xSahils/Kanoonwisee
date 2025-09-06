const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin role required.' });
  }
  next();
};

// Apply admin middleware to all routes
router.use(authMiddleware);
router.use(requireAdmin);

router.get('/lawyers/pending', adminController.getPendingLawyers);
router.put('/lawyers/:id/status', adminController.updateLawyerStatus);

module.exports = router;
