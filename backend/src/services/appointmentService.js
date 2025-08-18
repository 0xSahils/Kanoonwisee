const Appointment = require('../models/appointment.model');
const LawyerProfile = require('../models/lawyerProfile.model');
const ClientProfile = require('../models/clientProfile.model');
const User = require('../models/user.model');

const getLawyerAppointments = async (userId) => {
    const lawyerProfile = await LawyerProfile.findOne({ where: { user_id: userId } });
    if (!lawyerProfile) {
        throw new Error('Lawyer profile not found.');
    }
    return await Appointment.findAll({ 
        where: { lawyer_id: lawyerProfile.id },
        include: [{
            model: ClientProfile,
            include: [{
                model: User,
                attributes: ['email']
            }],
            required: false // LEFT JOIN in case client_id is null
        }]
    });
};

const respondToAppointment = async (userId, appointmentId, status) => {
    const lawyerProfile = await LawyerProfile.findOne({ where: { user_id: userId } });
    if (!lawyerProfile) {
        throw new Error('Lawyer profile not found.');
    }

    const appointment = await Appointment.findOne({ where: { id: appointmentId, lawyer_id: lawyerProfile.id } });
    if (!appointment) {
        throw new Error('Appointment not found or you do not have permission to modify it.');
    }

    appointment.status = status;
    await appointment.save();
    return appointment;
};

module.exports = {
    getLawyerAppointments,
    respondToAppointment,
};
