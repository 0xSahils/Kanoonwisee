const LawyerProfile = require('../models/lawyerProfile.model');
const { 
  uploadToS3, 
  uploadToS3WithRetry,
  deleteFromS3, 
  generateS3Key, 
  processFileMetadata,
  generatePresignedUrl 
} = require('./s3Service');

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

/**
 * Create or update lawyer profile with file uploads
 * @param {string} userId - User ID
 * @param {Object} profileData - Profile data
 * @param {Object} files - Uploaded files from multer
 * @returns {Promise<Object>} - Updated profile
 */
const createOrUpdateLawyerProfileWithFiles = async (userId, profileData, files = {}) => {
  console.log(`📝 Creating/updating lawyer profile with files for user: ${userId}`);
  console.log(`📁 Files received: ${Object.keys(files).join(', ') || 'none'}`);
  
  // Map frontend field names properly
  const mappedFiles = {
    photo: files.photo,
    cv: files.cv,
    bar_registration_certificate: files.bar_registration_certificate // Keep frontend name here
  };
  
  let profile = await LawyerProfile.findOne({ where: { user_id: userId } });
  
  // Process file uploads
  const fileMetadata = {};
  
  // Handle each file type - process them with their frontend names first
  const fileTypeMapping = {
    'photo': 'photo',
    'cv': 'cv', 
    'bar_registration_certificate': 'bar_registration_file' // Map frontend to database field
  };
  
  // Process uploads in parallel with retry logic for better performance
  const uploadPromises = [];
  const deletePromises = [];
  
  for (const [frontendFieldName, dbFieldName] of Object.entries(fileTypeMapping)) {
    if (mappedFiles[frontendFieldName] && mappedFiles[frontendFieldName][0]) {
      const file = mappedFiles[frontendFieldName][0];
      console.log(`📤 Processing ${frontendFieldName} -> ${dbFieldName}: ${file.originalname} (${file.size} bytes)`);
      
      // Generate S3 key using frontend field name for path structure
      const s3Key = generateS3Key(frontendFieldName, file.originalname, userId);
      
      // Create upload promise with retry logic
      const uploadPromise = uploadToS3WithRetry(file.buffer, s3Key, file.mimetype, 3)
        .then(s3Result => {
          fileMetadata[dbFieldName] = processFileMetadata(file, frontendFieldName, userId, s3Result);
          console.log(`✅ ${frontendFieldName} uploaded successfully`);
          return s3Result;
        })
        .catch(error => {
          console.error(`❌ Failed to upload ${frontendFieldName} after retries:`, error.message);
          throw new Error(`File upload failed for ${frontendFieldName}: ${error.message}`);
        });
      
      uploadPromises.push(uploadPromise);
      
      // If updating and old file exists, schedule deletion
      if (profile && profile[dbFieldName]) {
        const oldKey = profile[dbFieldName]; // Now it's just a string
        console.log(`🗑️ Scheduling deletion of old ${frontendFieldName}: ${oldKey}`);
        const deletePromise = deleteFromS3(oldKey).catch(error => {
          console.warn(`⚠️ Failed to delete old file ${oldKey}:`, error.message);
          // Don't fail the operation for deletion errors
        });
        deletePromises.push(deletePromise);
      }
    }
  }
  
  // Wait for all uploads to complete
  if (uploadPromises.length > 0) {
    console.log(`⏳ Waiting for ${uploadPromises.length} file upload(s) to complete...`);
    await Promise.all(uploadPromises);
    console.log(`✅ All file uploads completed successfully`);
  }
  
  // Handle deletions after uploads succeed
  if (deletePromises.length > 0) {
    console.log(`🗑️ Processing ${deletePromises.length} file deletion(s)...`);
    await Promise.all(deletePromises);
    console.log(`✅ Old file cleanup completed`);
  }
  
  
  // Merge file metadata with profile data
  // Remove any fields that don't exist in the model
  const { message, ...cleanProfileData } = profileData;
  
  const completeProfileData = {
    ...cleanProfileData,
    ...fileMetadata
  };
  
  console.log('📋 Complete profile data before save:', JSON.stringify(completeProfileData, null, 2));
  
  try {
    if (profile) {
      console.log(`📝 Updating existing profile for user: ${userId}`);
      return await profile.update(completeProfileData);
    } else {
      console.log(`🆕 Creating new profile for user: ${userId}`);
      return await LawyerProfile.create({ ...completeProfileData, user_id: userId });
    }
  } catch (error) {
    console.error('❌ Database error during profile save:', error);
    console.error('📋 Profile data that caused error:', JSON.stringify(completeProfileData, null, 2));
    throw error;
  }
};

/**
 * Generate pre-signed URLs for lawyer profile files
 * @param {string} userId - User ID
 * @param {Array<string>} fileTypes - File types to generate URLs for
 * @returns {Promise<Object>} - Object with pre-signed URLs
 */
const generateProfileFileUrls = async (userId, fileTypes = ['photo', 'cv', 'bar_registration_file']) => {
  const profile = await getLawyerProfile(userId);
  
  if (!profile) {
    throw new Error('Lawyer profile not found');
  }
  
  const urls = {};
  
  for (const fileType of fileTypes) {
    if (profile[fileType]) { // Now it's just a string key
      try {
        urls[fileType] = await generatePresignedUrl(profile[fileType]);
      } catch (error) {
        console.error(`Failed to generate URL for ${fileType}:`, error);
        urls[fileType] = null;
      }
    } else {
      urls[fileType] = null;
    }
  }
  
  return urls;
};

/**
 * Delete a specific file from lawyer profile
 * @param {string} userId - User ID
 * @param {string} fileType - File type to delete
 * @returns {Promise<Object>} - Updated profile
 */
const deleteProfileFile = async (userId, fileType) => {
  const profile = await LawyerProfile.findOne({ where: { user_id: userId } });
  
  if (!profile) {
    throw new Error('Lawyer profile not found');
  }
  
  if (profile[fileType]) { // Now it's just a string key
    // Delete from S3
    await deleteFromS3(profile[fileType]);
    
    // Update profile to remove file metadata
    return await profile.update({ [fileType]: null });
  }
  
  return profile;
};

module.exports = {
  getLawyerProfile,
  createOrUpdateLawyerProfile,
  createOrUpdateLawyerProfileWithFiles,
  generateProfileFileUrls,
  deleteProfileFile
};
