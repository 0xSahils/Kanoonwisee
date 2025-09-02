const lawyerService = require('../services/lawyerService');

/**
 * Filter out sensitive information from lawyer profile
 * @param {Object} profile - Raw lawyer profile from database
 * @returns {Object} - Sanitized profile safe for client consumption
 */
const sanitizeLawyerProfile = (profile) => {
  return {
    id: profile.id,
    full_name: profile.full_name,
    specialization: profile.specialization,
    court_practice: profile.court_practice,
    fee_structure: profile.fee_structure,
    years_experience: profile.years_experience,
    languages: profile.languages,
    city: profile.city,
    consultation_type: profile.consultation_type,
    // Sensitive fields like user_id, bar_registration_number are excluded
    created_at: profile.created_at,
    updated_at: profile.updated_at
  };
};

const getProfile = async (req, res, next) => {
  try {
    const profile = await lawyerService.getLawyerProfile(req.user.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    // Filter out sensitive information before sending response
    const safeProfile = sanitizeLawyerProfile(profile);
    
    res.status(200).json(safeProfile);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const profile = await lawyerService.createOrUpdateLawyerProfile(req.user.id, req.body);
    
    // Filter out sensitive information before sending response
    const safeProfile = sanitizeLawyerProfile(profile);
    
    res.status(200).json({ 
      message: 'Profile updated successfully',
      profile: safeProfile 
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
