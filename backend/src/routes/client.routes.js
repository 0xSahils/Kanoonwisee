const express = require("express");
const clientController = require("../controllers/clientController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { verifyCsrfToken } = require("../middlewares/csrfMiddleware");
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

// Client profile management (GET doesn't need CSRF, PUT does)
router.get("/profile", clientController.getProfile);
router.put(
  "/profile",
  verifyCsrfToken,
  validateRequest(clientProfileSchema),
  clientController.updateProfile
);

// Lawyer search and discovery (GET operations - no CSRF needed)
router.get("/lawyers", clientController.getAllLawyers);
router.get("/lawyers/search", clientController.searchLawyers);
router.get("/lawyers/:id", clientController.getLawyerDetails);

// Appointment management (state-changing operations need CSRF)
router.post(
  "/book",
  verifyCsrfToken,
  validateRequest(bookAppointmentSchema),
  clientController.bookAppointment
);
router.get("/appointments", clientController.getAppointments);
router.delete("/appointments/:id", verifyCsrfToken, clientController.cancelAppointment);

// Stats endpoint (GET doesn't need CSRF)
// TODO: Implement getStats method in clientController
// router.get("/stats", clientController.getStats);

module.exports = router;
