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
    state: profile.state,
    consultation_type: profile.consultation_type,
    secondary_specialization: profile.secondary_specialization,
    // Include file information (just existence, not the actual S3 keys for security)
    files: {
      photo: profile.photo ? { hasFile: true, key: profile.photo } : { hasFile: false },
      cv: profile.cv ? { hasFile: true, key: profile.cv } : { hasFile: false },
      bar_registration_file: profile.bar_registration_file ? { hasFile: true, key: profile.bar_registration_file } : { hasFile: false }
    },
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
    const files = req.files || {};
    
    // Use the file upload service if files are present
    if (Object.keys(files).length > 0) {
      // Use the file upload service for profiles with files
      const profile = await lawyerService.createOrUpdateLawyerProfileWithFiles(
        req.user.id, 
        req.body, 
        files
      );
      
      // Filter out sensitive information before sending response
      const safeProfile = sanitizeLawyerProfile(profile);
      
      res.status(200).json({ 
        message: 'Profile updated successfully with files',
        profile: safeProfile 
      });
    } else {
      // Use the regular service for profiles without files
      const profile = await lawyerService.createOrUpdateLawyerProfile(req.user.id, req.body);
      
      // Filter out sensitive information before sending response
      const safeProfile = sanitizeLawyerProfile(profile);
      
      res.status(200).json({ 
        message: 'Profile updated successfully',
        profile: safeProfile 
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
