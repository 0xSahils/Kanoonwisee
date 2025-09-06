const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { s3Client, S3_CONFIG } = require('../config/s3Config');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

/**
 * Generate a unique S3 key for file storage
 * @param {string} fileType - Type of file (photo, cv, bar_registration_file)
 * @param {string} originalName - Original filename
 * @param {string} userId - User ID for organization
 * @returns {string} - Unique S3 key
 */
const generateS3Key = (fileType, originalName, userId) => {
  const extension = path.extname(originalName);
  const baseName = path.basename(originalName, extension);
  const fileName = `${userId}_${baseName}${extension}`;
  return `${S3_CONFIG.UPLOAD_PATHS[fileType]}${fileName}`;
};

/**
 * Upload file to S3 with retry logic
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} key - S3 object key
 * @param {string} mimeType - File MIME type
 * @param {number} maxRetries - Maximum number of retries
 * @returns {Promise<Object>} - Upload result
 */
const uploadToS3WithRetry = async (fileBuffer, key, mimeType, maxRetries = 3) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📤 Upload attempt ${attempt}/${maxRetries} for: ${key}`);
      const result = await uploadToS3(fileBuffer, key, mimeType);
      
      if (attempt > 1) {
        console.log(`✅ Upload succeeded on attempt ${attempt} for: ${key}`);
      }
      
      return result;
    } catch (error) {
      lastError = error;
      
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Exponential backoff, max 5s
        console.warn(`⚠️ Upload attempt ${attempt} failed for ${key}: ${error.message}`);
        console.log(`⏳ Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error(`❌ Upload failed after ${maxRetries} attempts for ${key}: ${error.message}`);
      }
    }
  }
  
  throw lastError;
};

/**
 * Upload file to S3
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} key - S3 object key
 * @param {string} mimeType - File MIME type
 * @returns {Promise<Object>} - Upload result
 */
const uploadToS3 = async (fileBuffer, key, mimeType) => {
  try {
    console.log(`📤 Uploading file to S3: ${key}`);
    console.log(`   Size: ${fileBuffer.length} bytes`);
    console.log(`   MIME Type: ${mimeType}`);
    
    const command = new PutObjectCommand({
      Bucket: S3_CONFIG.BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: mimeType,
      ServerSideEncryption: 'AES256', // Server-side encryption
      Metadata: {
        'uploaded-at': new Date().toISOString(),
        'service': 'kanoonwise'
      }
    });

    await s3Client.send(command);
    
    console.log(`✅ File uploaded successfully: ${key}`);
    
    return {
      bucket: S3_CONFIG.BUCKET_NAME,
      key: key,
      region: S3_CONFIG.REGION,
      uploadedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error(`❌ S3 Upload Error for ${key}:`, error.message);
    console.error(`   Bucket: ${S3_CONFIG.BUCKET_NAME}`);
    console.error(`   Region: ${S3_CONFIG.REGION}`);
    throw new Error(`Failed to upload file to S3: ${error.message}`);
  }
};

/**
 * Delete file from S3
 * @param {string} key - S3 object key
 * @returns {Promise<void>}
 */
const deleteFromS3 = async (key) => {
  try {
    console.log(`🗑️ Deleting file from S3: ${key}`);
    
    const command = new DeleteObjectCommand({
      Bucket: S3_CONFIG.BUCKET_NAME,
      Key: key
    });

    await s3Client.send(command);
    console.log(`✅ Successfully deleted file: ${key}`);
  } catch (error) {
    console.error(`❌ S3 Delete Error for ${key}:`, error.message);
    throw new Error(`Failed to delete file from S3: ${error.message}`);
  }
};

/**
 * Generate pre-signed URL for secure file access
 * @param {string} key - S3 object key
 * @param {number} expiresIn - URL expiry time in seconds (default: 15 minutes)
 * @returns {Promise<string>} - Pre-signed URL
 */
const generatePresignedUrl = async (key, expiresIn = S3_CONFIG.SIGNED_URL_EXPIRY) => {
  try {
    console.log(`🔗 Generating pre-signed URL for: ${key}`);
    console.log(`   Expires in: ${expiresIn} seconds`);
    
    const command = new PutObjectCommand({
      Bucket: S3_CONFIG.BUCKET_NAME,
      Key: key
    });

    // Use GetObjectCommand for downloading
    const { GetObjectCommand } = require('@aws-sdk/client-s3');
    const getCommand = new GetObjectCommand({
      Bucket: S3_CONFIG.BUCKET_NAME,
      Key: key
    });

    const signedUrl = await getSignedUrl(s3Client, getCommand, { expiresIn });
    console.log(`✅ Pre-signed URL generated successfully for: ${key}`);
    
    return signedUrl;
  } catch (error) {
    console.error(`❌ Pre-signed URL Generation Error for ${key}:`, error.message);
    throw new Error(`Failed to generate pre-signed URL: ${error.message}`);
  }
};

/**
 * Validate file type and size
 * @param {string} fileType - Type of file being uploaded
 * @param {string} mimeType - File MIME type
 * @param {number} fileSize - File size in bytes
 * @returns {Object} - Validation result
 */
const validateFile = (fileType, mimeType, fileSize) => {
  const allowedTypes = S3_CONFIG.ALLOWED_MIME_TYPES[fileType];
  
  if (!allowedTypes) {
    return {
      isValid: false,
      error: `Invalid file type: ${fileType}`
    };
  }

  if (!allowedTypes.includes(mimeType)) {
    return {
      isValid: false,
      error: `Invalid MIME type for ${fileType}. Allowed types: ${allowedTypes.join(', ')}`
    };
  }

  if (fileSize > S3_CONFIG.MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File size exceeds limit. Maximum size: ${S3_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB`
    };
  }

  return { isValid: true };
};

/**
 * Process uploaded file metadata for database storage
 * @param {Object} file - Multer file object
 * @param {string} fileType - Type of file
 * @param {string} userId - User ID
 * @returns {Object} - File metadata for database
 */
const processFileMetadata = (file, fileType, userId, s3Result) => {
  // Just return the S3 key as a string for simple storage
  return s3Result.key;
};

module.exports = {
  generateS3Key,
  uploadToS3,
  uploadToS3WithRetry,
  deleteFromS3,
  generatePresignedUrl,
  validateFile,
  processFileMetadata,
  S3_CONFIG
};
