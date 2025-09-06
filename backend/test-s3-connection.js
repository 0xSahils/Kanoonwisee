#!/usr/bin/env node

/**
 * Simple S3 Connection Test Script
 * Usage: node test-s3-connection.js
 */

require('dotenv').config();

async function testS3() {
  try {
    console.log('🚀 Starting S3 Connection Test...\n');
    
    // Check environment variables
    console.log('📋 Checking environment variables...');
    const requiredVars = [
      'AWS_ACCESS_KEY_ID',
      'AWS_SECRET_ACCESS_KEY',
      'AWS_REGION',
      'AWS_S3_BUCKET_NAME'
    ];
    
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('❌ Missing environment variables:');
      missingVars.forEach(varName => {
        console.error(`   - ${varName}`);
      });
      process.exit(1);
    }
    
    console.log('✅ All environment variables are set');
    console.log(`   Bucket: ${process.env.AWS_S3_BUCKET_NAME}`);
    console.log(`   Region: ${process.env.AWS_REGION}`);
    console.log(`   Access Key: ${process.env.AWS_ACCESS_KEY_ID.substring(0, 8)}***\n`);
    
    // Test S3 connection
    const { testS3Connection } = require('./src/config/s3Config');
    const isConnected = await testS3Connection();
    
    if (isConnected) {
      console.log('\n🎉 S3 connection test PASSED!');
      console.log('✅ Your AWS S3 configuration is working correctly.');
      console.log('✅ The bucket is accessible and ready for file uploads.');
    } else {
      console.log('\n❌ S3 connection test FAILED!');
      console.log('💡 Please check:');
      console.log('   1. AWS credentials are correct');
      console.log('   2. Bucket exists and is in the specified region');
      console.log('   3. IAM user has proper permissions (s3:GetObject, s3:PutObject, s3:DeleteObject)');
      console.log('   4. Network connectivity to AWS');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n💥 Test failed with error:', error.message);
    process.exit(1);
  }
}

// Run the test
if (require.main === module) {
  testS3();
}

module.exports = { testS3 };
