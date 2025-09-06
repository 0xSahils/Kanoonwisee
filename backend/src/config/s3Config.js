const { S3Client, HeadBucketCommand } = require('@aws-sdk/client-s3');
const { s3Logger } = require('../utils/logger');
require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = [
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY', 
  'AWS_REGION',
  'AWS_S3_BUCKET_NAME'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Create S3 client with AWS SDK v3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Test S3 bucket connectivity
 * @returns {Promise<boolean>} - Connection status
 */
const testS3Connection = async () => {
  try {
    s3Logger.info('Testing S3 bucket connectivity...');
    
    const command = new HeadBucketCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME
    });
    
    await s3Client.send(command);
    
    s3Logger.success('S3 bucket is accessible', {
      bucket: process.env.AWS_S3_BUCKET_NAME,
      region: process.env.AWS_REGION,
      accessKey: process.env.AWS_ACCESS_KEY_ID?.substring(0, 8) + '***'
    });
    
    return true;
  } catch (error) {
    s3Logger.error('S3 bucket connection failed', {
      bucket: process.env.AWS_S3_BUCKET_NAME,
      region: process.env.AWS_REGION,
      accessKey: process.env.AWS_ACCESS_KEY_ID?.substring(0, 8) + '***',
      error: error.message,
      errorCode: error.name
    });
    
    // Provide helpful error messages
    if (error.name === 'NotFound') {
      s3Logger.warn('Bucket does not exist or is in a different region');
    } else if (error.name === 'Forbidden') {
      s3Logger.warn('Access denied - check IAM permissions');
    } else if (error.name === 'CredentialsProviderError') {
      s3Logger.warn('Invalid AWS credentials');
    } else if (error.name === 'NetworkingError') {
      s3Logger.warn('Network connection issue');
    }
    
    return false;
  }
};

// Test connection on module load (async, non-blocking)
if (process.env.NODE_ENV !== 'test') {
  // Only test in non-test environments to avoid interference with tests
  setImmediate(async () => {
    try {
      await testS3Connection();
    } catch (error) {
      s3Logger.warn('S3 connection test failed during startup', { error: error.message });
    }
  });
}

// S3 configuration constants
const S3_CONFIG = {
  BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  REGION: process.env.AWS_REGION,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_MIME_TYPES: {
    photo: ['image/jpeg', 'image/png', 'image/jpg'],
    cv: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    bar_registration_certificate: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
  },
  SIGNED_URL_EXPIRY: 15 * 60, // 15 minutes in seconds
  UPLOAD_PATHS: {
    photo: 'lawyer-profiles/photos/',
    cv: 'lawyer-profiles/cvs/',
    bar_registration_certificate: 'lawyer-profiles/bar-registrations/'
  }
};

module.exports = {
  s3Client,
  S3_CONFIG,
  testS3Connection
};
