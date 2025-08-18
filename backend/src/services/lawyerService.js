const LawyerProfile = require('../models/lawyerProfile.model');

const getLawyerProfile = async (userId) => {
  return await LawyerProfile.findOne({ where: { user_id: userId } });
};

const createOrUpdateLawyerProfile = async (userId, profileData) => {
  let profile = await LawyerProfile.findOne({ where: { user_id: userId } });

  if (profile) {
    return await profile.update(profileData);
  } else {
    return await LawyerProfile.create({ ...profileData, user_id: userId });
  }
};

module.exports = {
  getLawyerProfile,
  createOrUpdateLawyerProfile,
};
