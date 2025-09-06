const express = require('express');
const healthController = require('../controllers/healthController');

const router = express.Router();

// S3 health check endpoint (no authentication required for ops monitoring)
router.get('/s3', healthController.testS3Health);

// General health check
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'KanoonWise API is running',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

module.exports = router;
