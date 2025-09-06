const { uploadToS3, generateS3Key } = require('./src/services/s3Service');
const fs = require('fs');
const path = require('path');

async function testUpload() {
  try {
    console.log('🚀 Testing S3 upload functionality...');
    
    // Create a test file buffer
    const testContent = 'This is a test file for S3 upload';
    const testBuffer = Buffer.from(testContent, 'utf8');
    
    // Generate a test S3 key
    const testKey = generateS3Key('photo', 'test-image.jpg', 'test-user-123');
    console.log('📝 Generated S3 key:', testKey);
    
    // Test upload
    console.log('📤 Uploading test file...');
    const result = await uploadToS3(testBuffer, testKey, 'image/jpeg');
    
    console.log('✅ Upload successful!');
    console.log('📊 Result:', result);
    
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    console.error('📋 Error details:', error);
  }
}

testUpload();
