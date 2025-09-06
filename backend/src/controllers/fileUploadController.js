const lawyerService = require('../services/lawyerService');
const { generatePresignedUrl } = require('../services/s3Service');

/**
 * Handle lawyer profile creation/update with files
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
const uploadLawyerFiles = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;
    const files = req.files;
    
    // Validate that at least some profile data or files are provided
    if (!profileData || Object.keys(profileData).length === 0) {
      if (!files || Object.keys(files).length === 0) {
        return res.status(400).json({
          message: 'No profile data or files provided',
          code: 'NO_DATA_PROVIDED'
        });
      }
    }
    
    // Process profile update with files
    const profile = await lawyerService.createOrUpdateLawyerProfileWithFiles(
      userId, 
      profileData, 
      files
    );
    
    // Sanitize response to remove sensitive data
    const sanitizedProfile = {
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
      // Include file metadata (without sensitive S3 keys)
      files: {
        photo: profile.photo ? {
          originalName: profile.photo.originalName,
          mimeType: profile.photo.mimeType,
          size: profile.photo.size,
          uploadedAt: profile.photo.uploadedAt
        } : null,
        cv: profile.cv ? {
          originalName: profile.cv.originalName,
          mimeType: profile.cv.mimeType,
          size: profile.cv.size,
          uploadedAt: profile.cv.uploadedAt
        } : null,
        bar_registration_file: profile.bar_registration_file ? {
          originalName: profile.bar_registration_file.originalName,
          mimeType: profile.bar_registration_file.mimeType,
          size: profile.bar_registration_file.size,
          uploadedAt: profile.bar_registration_file.uploadedAt
        } : null
      },
      created_at: profile.created_at,
      updated_at: profile.updated_at
    };
    
    res.status(200).json({
      message: 'Lawyer profile updated successfully',
      profile: sanitizedProfile
    });
    
  } catch (error) {
    console.error('Upload lawyer files error:', error);
    next(error);
  }
};

/**
 * Generate pre-signed URLs for lawyer profile files
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
const getFileUrls = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { fileTypes } = req.query;
    
    // Parse fileTypes from query parameter
    let requestedFileTypes = ['photo', 'cv', 'bar_registration_file'];
    if (fileTypes) {
      requestedFileTypes = fileTypes.split(',').filter(type => 
        ['photo', 'cv', 'bar_registration_file'].includes(type)
      );
    }
    
    if (requestedFileTypes.length === 0) {
      return res.status(400).json({
        message: 'Invalid file types requested',
        code: 'INVALID_FILE_TYPES'
      });
    }
    
    // Generate pre-signed URLs
    const urls = await lawyerService.generateProfileFileUrls(userId, requestedFileTypes);
    
    res.status(200).json({
      message: 'File URLs generated successfully',
      urls: urls,
      expiresIn: '15 minutes'
    });
    
  } catch (error) {
    console.error('Get file URLs error:', error);
    
    if (error.message === 'Lawyer profile not found') {
      return res.status(404).json({
        message: 'Lawyer profile not found',
        code: 'PROFILE_NOT_FOUND'
      });
    }
    
    next(error);
  }
};

/**
 * Delete a specific file from lawyer profile
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
const deleteFile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { fileType } = req.params;
    
    // Validate file type
    if (!['photo', 'cv', 'bar_registration_file'].includes(fileType)) {
      return res.status(400).json({
        message: 'Invalid file type',
        code: 'INVALID_FILE_TYPE'
      });
    }
    
    // Delete file
    const profile = await lawyerService.deleteProfileFile(userId, fileType);
    
    res.status(200).json({
      message: `${fileType} deleted successfully`,
      profile: {
        id: profile.id,
        [fileType]: null
      }
    });
    
  } catch (error) {
    console.error('Delete file error:', error);
    
    if (error.message === 'Lawyer profile not found') {
      return res.status(404).json({
        message: 'Lawyer profile not found',
        code: 'PROFILE_NOT_FOUND'
      });
    }
    
    next(error);
  }
};

/**
 * Get file metadata without generating URLs
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
const getFileMetadata = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await lawyerService.getLawyerProfile(userId);
    
    if (!profile) {
      return res.status(404).json({
        message: 'Lawyer profile not found',
        code: 'PROFILE_NOT_FOUND'
      });
    }
    
    const fileMetadata = {
      photo: profile.photo ? {
        originalName: profile.photo.originalName,
        mimeType: profile.photo.mimeType,
        size: profile.photo.size,
        uploadedAt: profile.photo.uploadedAt,
        hasFile: true
      } : { hasFile: false },
      cv: profile.cv ? {
        originalName: profile.cv.originalName,
        mimeType: profile.cv.mimeType,
        size: profile.cv.size,
        uploadedAt: profile.cv.uploadedAt,
        hasFile: true
      } : { hasFile: false },
      bar_registration_file: profile.bar_registration_file ? {
        originalName: profile.bar_registration_file.originalName,
        mimeType: profile.bar_registration_file.mimeType,
        size: profile.bar_registration_file.size,
        uploadedAt: profile.bar_registration_file.uploadedAt,
        hasFile: true
      } : { hasFile: false }
    };
    
    res.status(200).json({
      message: 'File metadata retrieved successfully',
      files: fileMetadata
    });
    
  } catch (error) {
    console.error('Get file metadata error:', error);
    next(error);
  }
};

module.exports = {
  uploadLawyerFiles,
  getFileUrls,
  deleteFile,
  getFileMetadata
};
