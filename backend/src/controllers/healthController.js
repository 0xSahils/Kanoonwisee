const { testS3Connection } = require('../config/s3Config');

/**
 * Test S3 bucket connectivity endpoint
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
const testS3Health = async (req, res, next) => {
  try {
    console.log('🔍 Manual S3 connection test requested');
    
    const isConnected = await testS3Connection();
    
    if (isConnected) {
      res.status(200).json({
        status: 'success',
        message: 'S3 bucket is accessible',
        bucket: process.env.AWS_S3_BUCKET_NAME,
        region: process.env.AWS_REGION,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(503).json({
        status: 'error',
        message: 'S3 bucket is not accessible',
        bucket: process.env.AWS_S3_BUCKET_NAME,
        region: process.env.AWS_REGION,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('S3 health check error:', error);
    res.status(500).json({
      status: 'error',
      message: 'S3 health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};

module.exports = {
  testS3Health
};
