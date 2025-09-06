const multer = require('multer');
const { S3_CONFIG } = require('../config/s3Config');
const { validateFile } = require('../services/s3Service');

/**
 * Memory storage configuration for multer
 * Files are stored in memory before uploading to S3
 */
const storage = multer.memoryStorage();

/**
 * File filter function to validate file types
 * @param {Object} req - Express request object
 * @param {Object} file - Multer file object
 * @param {Function} cb - Callback function
 */
const fileFilter = (req, file, cb) => {
  // Extract file type from field name
  const fileType = file.fieldname;
  
  // Only validate MIME type here (file size is handled by multer limits)
  const allowedTypes = S3_CONFIG.ALLOWED_MIME_TYPES[fileType];
  
  if (!allowedTypes) {
    return cb(new Error(`Invalid file type: ${fileType}`), false);
  }

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error(`Invalid MIME type for ${fileType}. Allowed types: ${allowedTypes.join(', ')}`), false);
  }
  
  cb(null, true);
};

/**
 * Configure multer for lawyer profile file uploads
 */
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: S3_CONFIG.MAX_FILE_SIZE,
    files: 3, // Maximum 3 files (photo, cv, bar_registration_file)
    fields: 20 // Allow for other form fields
  }
});

/**
 * Multer configuration for specific lawyer profile files
 */
const lawyerFileUpload = upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'cv', maxCount: 1 },
  { name: 'bar_registration_certificate', maxCount: 1 }
]);

/**
 * Error handler for multer errors
 * @param {Error} error - Multer error
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(400).json({
          message: 'File size too large',
          error: `Maximum file size is ${S3_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB`,
          code: 'FILE_SIZE_LIMIT'
        });
      case 'LIMIT_FILE_COUNT':
        return res.status(400).json({
          message: 'Too many files',
          error: 'Maximum 3 files allowed',
          code: 'FILE_COUNT_LIMIT'
        });
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json({
          message: 'Unexpected file field',
          error: 'Only photo, cv, and bar_registration_certificate are allowed',
          code: 'UNEXPECTED_FILE'
        });
      default:
        return res.status(400).json({
          message: 'File upload error',
          error: error.message,
          code: 'UPLOAD_ERROR'
        });
    }
  }
  
  // Handle custom validation errors
  if (error.message.includes('Invalid')) {
    return res.status(400).json({
      message: 'File validation error',
      error: error.message,
      code: 'VALIDATION_ERROR'
    });
  }
  
  next(error);
};

module.exports = {
  lawyerFileUpload,
  handleMulterError,
  upload
};
