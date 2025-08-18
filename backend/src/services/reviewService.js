const Review = require('../models/review.model');
const Appointment = require('../models/appointment.model');
const ClientProfile = require('../models/clientProfile.model');
const LawyerProfile = require('../models/lawyerProfile.model');

const createReview = async (clientUserId, reviewData) => {
    // Get client profile
    const clientProfile = await ClientProfile.findOne({ where: { user_id: clientUserId } });
    if (!clientProfile) {
        throw new Error('Client profile not found');
    }

    // Check if client had a completed appointment with this lawyer
    const completedAppointment = await Appointment.findOne({
        where: {
            client_id: clientProfile.id,
            lawyer_id: reviewData.lawyer_id,
            status: 'completed'
        }
    });

    if (!completedAppointment) {
        throw new Error('You can only review lawyers you have had completed appointments with');
    }

    // Check if review already exists
    const existingReview = await Review.findOne({
        where: {
            client_id: clientProfile.id,
            lawyer_id: reviewData.lawyer_id
        }
    });

    if (existingReview) {
        throw new Error('You have already reviewed this lawyer');
    }

    return await Review.create({
        ...reviewData,
        client_id: clientProfile.id
    });
};

const getLawyerReviews = async (lawyerId) => {
    return await Review.findAll({
        where: { lawyer_id: lawyerId },
        include: [
            {
                model: ClientProfile,
                attributes: ['full_name']
            }
        ],
        order: [['created_at', 'DESC']]
    });
};

module.exports = {
    createReview,
    getLawyerReviews
};
