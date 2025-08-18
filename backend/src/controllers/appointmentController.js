const appointmentService = require("../services/appointmentService");

const getAppointments = async (req, res, next) => {
  try {
    const appointments = await appointmentService.getLawyerAppointments(
      req.user.id
    );
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

const respondToAppointment = async (req, res, next) => {
  try {
    const { appointmentId, status } = req.body;
    console.log("Appointment status update request:", {
      appointmentId,
      status,
      userId: req.user.id,
    });
    const appointment = await appointmentService.respondToAppointment(
      req.user.id,
      appointmentId,
      status
    );
    console.log(
      "Appointment status updated successfully:",
      appointment.id,
      "to",
      appointment.status
    );
    res.status(200).json(appointment);
  } catch (error) {
    console.log("Error updating appointment status:", error.message);
    next(error);
  }
};

module.exports = {
  getAppointments,
  respondToAppointment,
};
