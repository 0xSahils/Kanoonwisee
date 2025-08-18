const express = require("express");
const lawyerController = require("../controllers/lawyerController");
const appointmentController = require("../controllers/appointmentController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const {
  lawyerProfileSchema,
  respondAppointmentSchema,
} = require("../utils/validationSchemas");

const router = express.Router();

router.use(authMiddleware);

// Profile routes
router.get("/profile", lawyerController.getProfile);
router.put(
  "/profile",
  validateRequest(lawyerProfileSchema),
  lawyerController.updateProfile
);

// Appointment routes
router.get("/appointments", appointmentController.getAppointments);
router.patch(
  "/appointments/respond",
  validateRequest(respondAppointmentSchema),
  appointmentController.respondToAppointment
);

module.exports = router;
