const express = require("express");
const lawyerController = require("../controllers/lawyerController");
const appointmentController = require("../controllers/appointmentController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { verifyCsrfToken } = require("../middlewares/csrfMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const {
  lawyerProfileSchema,
  respondAppointmentSchema,
} = require("../utils/validationSchemas");

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Profile routes (GET doesn't need CSRF, PUT does)
router.get("/profile", lawyerController.getProfile);
router.put(
  "/profile",
  verifyCsrfToken,
  validateRequest(lawyerProfileSchema),
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

// Stats endpoint (GET doesn't need CSRF)
// TODO: Implement getStats method in lawyerController
// router.get("/stats", lawyerController.getStats);

module.exports = router;
