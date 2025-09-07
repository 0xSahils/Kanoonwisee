const LawyerProfile = require('../models/lawyerProfile.model');
const User = require('../models/user.model');
const { generatePresignedUrl } = require('../services/s3Service');

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
  updateLawyerStatus,
  getLawyerDocumentUrl
};
