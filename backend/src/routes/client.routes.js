const express = require("express");
const clientController = require("../controllers/clientController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const {
  clientProfileSchema,
  bookAppointmentSchema,
} = require("../utils/validationSchemas");

const router = express.Router();

// All client routes require authentication
router.use(authMiddleware);
// Note: Removed role restriction to allow any authenticated user to book appointments

// Client profile management
router.get("/profile", clientController.getProfile);
router.put(
  "/profile",
  validateRequest(clientProfileSchema),
  clientController.updateProfile
);

// Lawyer search and discovery
router.get("/lawyers", clientController.getAllLawyers);
router.get("/lawyers/search", clientController.searchLawyers);
router.get("/lawyers/:id", clientController.getLawyerDetails);

// Appointment management
router.post(
  "/book",
  validateRequest(bookAppointmentSchema),
  clientController.bookAppointment
);
router.get("/appointments", clientController.getAppointments);
router.delete("/appointments/:id", clientController.cancelAppointment);
router.put("/appointments/:id/cancel", clientController.cancelAppointment);

module.exports = router;
