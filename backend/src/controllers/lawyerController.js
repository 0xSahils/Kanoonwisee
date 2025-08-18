const lawyerService = require('../services/lawyerService');

const getProfile = async (req, res, next) => {
  try {
    const profile = await lawyerService.getLawyerProfile(req.user.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const profile = await lawyerService.createOrUpdateLawyerProfile(req.user.id, req.body);
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
