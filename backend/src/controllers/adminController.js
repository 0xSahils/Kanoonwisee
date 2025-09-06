const LawyerProfile = require('../models/lawyerProfile.model');
const User = require('../models/user.model');

const getPendingLawyers = async (req, res) => {
  try {
    const lawyers = await LawyerProfile.findAll({
      where: { approved: 'pending' },
      include: [{
        model: User,
        attributes: ['email'] // Only select available columns
      }]
    });
    res.json(lawyers);
  } catch (error) {
    console.error('Error fetching pending lawyers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateLawyerStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'canceled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const lawyer = await LawyerProfile.findByPk(id);
    if (!lawyer) {
      return res.status(404).json({ error: 'Lawyer not found' });
    }

    lawyer.approved = status;
    await lawyer.save();

    res.json({ message: 'Lawyer status updated successfully' });
  } catch (error) {
    console.error('Error updating lawyer status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getPendingLawyers,
  updateLawyerStatus
};
