const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

/**
 * Upload a file buffer to S3
 * @param {Buffer} fileBuffer - File content as buffer
 * @param {string} key - S3 object key (file path)
 * @param {string} contentType - MIME type of the file
 * @returns {Promise<string>} - S3 object key
 */
const uploadToS3 = async (fileBuffer, key, contentType = 'application/pdf') => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
    ServerSideEncryption: 'AES256',
  };

  await s3.upload(params).promise();
  return key;
};

/**
 * Generate a presigned URL for downloading a file from S3
 * @param {string} key - S3 object key
 * @param {number} expiresIn - URL expiry time in seconds (default 7 days)
 * @returns {Promise<{url: string, expiresAt: Date}>}
 */
const getPresignedUrl = async (key, expiresIn = 7 * 24 * 60 * 60) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Expires: expiresIn,
  };

  const url = await s3.getSignedUrlPromise('getObject', params);
  const expiresAt = new Date(Date.now() + expiresIn * 1000);

  return { url, expiresAt };
};

module.exports = {
  s3,
  uploadToS3,
  getPresignedUrl,
  BUCKET_NAME,
};
