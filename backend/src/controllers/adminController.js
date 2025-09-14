const LawyerProfile = require('../models/lawyerProfile.model');
const User = require('../models/user.model');
const { generatePresignedUrl } = require('../services/s3Service');
const { Op } = require('sequelize');

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

const getAllLawyers = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions = {};
    if (status && status !== 'all') {
      whereConditions.approved = status;
    }

    // Search conditions
    let searchConditions = {};
    if (search) {
      searchConditions = {
        [Op.or]: [
          { full_name: { [Op.iLike]: `%${search}%` } },
          { bar_registration_number: { [Op.iLike]: `%${search}%` } },
          { city: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    const { count, rows } = await LawyerProfile.findAndCountAll({
      where: {
        ...whereConditions,
        ...searchConditions
      },
      include: [{
        model: User,
        attributes: ['email'],
        where: search ? {
          email: { [Op.iLike]: `%${search}%` }
        } : undefined,
        required: search ? true : false
      }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      lawyers: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching lawyers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions = {};
    if (role && role !== 'all') {
      whereConditions.role = role;
    }

    if (search) {
      whereConditions.email = { [Op.iLike]: `%${search}%` };
    }

    const { count, rows } = await User.findAndCountAll({
      where: whereConditions,
      attributes: ['id', 'email', 'role', 'created_at'],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      users: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ['id', 'email', 'role', 'created_at'],
      include: [{
        model: LawyerProfile,
        required: false
      }]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
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

// Get lawyer document URL for viewing
const getLawyerDocumentUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { documentType } = req.query; // 'cv' or 'bar_registration_file'

    // Validate document type
    if (!['cv', 'bar_registration_file'].includes(documentType)) {
      return res.status(400).json({ error: 'Invalid document type' });
    }

    const lawyer = await LawyerProfile.findByPk(id);
    if (!lawyer) {
      return res.status(404).json({ error: 'Lawyer not found' });
    }

    // Get the S3 key for the requested document
    let s3Key;
    if (documentType === 'cv' && lawyer.cv) {
      s3Key = lawyer.cv;
    } else if (documentType === 'bar_registration_file' && lawyer.bar_registration_file) {
      s3Key = lawyer.bar_registration_file;
    } else {
      return res.status(404).json({ error: 'Document not found or not uploaded' });
    }

    // Generate pre-signed URL for viewing (valid for 1 hour)
    const viewUrl = await generatePresignedUrl(s3Key, 3600);
    
    res.json({
      success: true,
      viewUrl,
      documentType,
      fileName: s3Key.split('/').pop(), // Extract filename from S3 key
      expiresIn: 3600 // URL expires in 1 hour
    });
  } catch (error) {
    console.error('Error generating document URL:', error);
    res.status(500).json({ error: 'Failed to generate document URL' });
  }
};

module.exports = {
  getPendingLawyers,
  getAllLawyers,
  getAllUsers,
  getUserDetails,
  updateLawyerStatus,
  getLawyerDocumentUrl
};
