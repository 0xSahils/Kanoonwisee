const express = require('express');
const fileUploadController = require('../controllers/fileUploadController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { verifyCsrfToken } = require('../middlewares/csrfMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { lawyerFileUpload, handleMulterError } = require('../middlewares/fileUploadMiddleware');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Lawyer file upload route
// POST /api/files/lawyer/upload
router.post('/lawyer/upload', 
  roleMiddleware(['lawyer']), // Only lawyers can upload profile files
  verifyCsrfToken, // CSRF protection for state-changing operation
  lawyerFileUpload, // Multer middleware for file handling
  handleMulterError, // Handle multer-specific errors
  fileUploadController.uploadLawyerFiles
);

// Get pre-signed URLs for file access
// GET /api/files/lawyer/urls?fileTypes=photo,cv,bar_registration_file
router.get('/lawyer/urls',
  roleMiddleware(['lawyer']), // Only lawyers can access their files
  fileUploadController.getFileUrls
);

// Get file metadata without URLs
// GET /api/files/lawyer/metadata
router.get('/lawyer/metadata',
  roleMiddleware(['lawyer']), // Only lawyers can access their file metadata
  fileUploadController.getFileMetadata
);

// Delete specific file
// DELETE /api/files/lawyer/:fileType
router.delete('/lawyer/:fileType',
  roleMiddleware(['lawyer']), // Only lawyers can delete their files
  verifyCsrfToken, // CSRF protection for state-changing operation
  fileUploadController.deleteFile
);

// Handle multer errors at route level
router.use(handleMulterError);

module.exports = router;
