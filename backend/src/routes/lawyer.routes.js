const express = require("express");
const lawyerController = require("../controllers/lawyerController");
const appointmentController = require("../controllers/appointmentController");
const fileUploadController = require("../controllers/fileUploadController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { verifyCsrfToken } = require("../middlewares/csrfMiddleware");
const { validateRequest } = require("../middlewares/validateRequest");
const parseFormDataFields = require("../middlewares/parseFormDataFields");
const { lawyerFileUpload, handleMulterError } = require("../middlewares/fileUploadMiddleware");
const {
  lawyerProfileSchema,
  lawyerFileUploadSchema,
  respondAppointmentSchema,
} = require("../utils/validationSchemas");

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Profile routes (GET doesn't need CSRF, PUT does)
router.get("/profile", lawyerController.getProfile);

// Profile update route with optional file upload support
router.put(
  "/profile",
  verifyCsrfToken,
  lawyerFileUpload, // Multer middleware for handling multipart/form-data
  handleMulterError, // Handle multer-specific errors
  parseFormDataFields, // Parse JSON-stringified fields in FormData
  validateRequest(lawyerFileUploadSchema), // Use relaxed validation for file uploads
  lawyerController.updateProfile
);

// Appointment routes (GET doesn't need CSRF, PATCH does)
router.get("/appointments", appointmentController.getAppointments);
router.patch(
  "/appointments/respond",
  verifyCsrfToken,
  validateRequest(respondAppointmentSchema),
  appointmentController.respondToAppointment
);

// File management routes for lawyer profiles
// Get pre-signed URLs for file access
router.get("/profile/files/urls", fileUploadController.getFileUrls);

// Get file metadata without URLs
router.get("/profile/files/metadata", fileUploadController.getFileMetadata);

// Delete specific file
router.delete("/profile/files/:fileType", verifyCsrfToken, fileUploadController.deleteFile);

// Stats endpoint (GET doesn't need CSRF)
// TODO: Implement getStats method in lawyerController
// router.get("/stats", lawyerController.getStats);

module.exports = router;
