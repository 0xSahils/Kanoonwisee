const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { verifyCsrfToken } = require('../middlewares/csrfMiddleware');
const { validateRequest } = require('../middlewares/validateRequest');
const { respondAppointmentSchema } = require('../utils/validationSchemas');

const router = express.Router();

router.use(authMiddleware);

router.get('/', appointmentController.getAppointments);
router.patch('/respond', verifyCsrfToken, validateRequest(respondAppointmentSchema), appointmentController.respondToAppointment);
// TODO: Implement cancelAppointment method in appointmentController
// router.patch('/:id/cancel', verifyCsrfToken, appointmentController.cancelAppointment);

module.exports = router;
