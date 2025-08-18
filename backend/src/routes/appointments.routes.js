const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const { respondAppointmentSchema } = require('../utils/validationSchemas');

const router = express.Router();

router.use(authMiddleware);

router.get('/', appointmentController.getAppointments);
router.patch('/respond', validateRequest(respondAppointmentSchema), appointmentController.respondToAppointment);

module.exports = router;
