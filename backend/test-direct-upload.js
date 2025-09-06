const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const TEST_EMAIL = 'test.lawyer.direct@example.com';

async function testDirectFileUpload() {
  try {
    console.log('🚀 Starting direct file upload test...\n');

    // Step 1: Request OTP
    console.log('📧 Step 1: Requesting OTP...');
    const otpResponse = await axios.post(`${BASE_URL}/api/auth/request-otp`, {
      email: TEST_EMAIL
    });
    console.log('✅ OTP requested successfully');

    // Step 2: Get the OTP from database (direct query)
    const { User } = require('./src/models');
    const user = await User.findOne({ 
      where: { email: TEST_EMAIL },
      order: [['createdAt', 'DESC']]
    });
    
    if (!user || !user.otp) {
      throw new Error('No OTP found in database');
    }
    
    console.log(`🔑 Using OTP from database: ${user.otp}`);

    // Step 3: Verify OTP and register
    console.log('\\n🔐 Step 2: Verifying OTP and registering...');
    const registerResponse = await axios.post(`${BASE_URL}/api/auth/verify-otp`, {
      email: TEST_EMAIL,
      otp: user.otp,
      role: 'lawyer',
      name: 'Test Lawyer Direct',
      password: 'TestPassword123!'
    });

    console.log('✅ User registered successfully');
    const authToken = registerResponse.data.access_token;
    const userId = registerResponse.data.user.id;

    // Step 4: Create form data with files
    console.log('\\n📎 Step 3: Preparing file upload...');
    const formData = new FormData();

    // Add profile data
    const profileData = {
      full_name: 'Test Lawyer Direct Upload',
      specialization: 'Civil Law',
      years_experience: 5,
      bar_council_number: 'BAR' + Date.now(),
      contact_number: '+1234567890',
      location: 'Test City',
      description: 'Test lawyer for direct upload testing'
    };

    // Add each field separately
    Object.keys(profileData).forEach(key => {
      formData.append(key, profileData[key]);
    });

    // Add test files
    const testImageBuffer = Buffer.from('fake-image-data-for-testing', 'utf8');
    const testPdfBuffer = Buffer.from('fake-pdf-data-for-testing', 'utf8');

    formData.append('photo', testImageBuffer, {
      filename: 'test-photo.jpg',
      contentType: 'image/jpeg'
    });

    formData.append('cv', testPdfBuffer, {
      filename: 'test-cv.pdf', 
      contentType: 'application/pdf'
    });

    formData.append('bar_registration_certificate', testPdfBuffer, {
      filename: 'test-certificate.pdf',
      contentType: 'application/pdf'
    });

    console.log('📤 Uploading profile with files...');

    // Step 5: Upload profile with files
    const profileResponse = await axios.post(
      `${BASE_URL}/api/lawyer/profile`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          ...formData.getHeaders()
        },
        timeout: 30000 // 30 second timeout
      }
    );

    console.log('\\n✅ Profile upload successful!');
    console.log('📊 Response:', JSON.stringify(profileResponse.data, null, 2));
    
    console.log('\\n🎉 All tests passed! File upload is working correctly.');

  } catch (error) {
    console.error('\\n❌ Test failed:', error.message);
    if (error.response) {
      console.error('📋 Response data:', error.response.data);
      console.error('📋 Response status:', error.response.status);
    }
    process.exit(1);
  }
}

// Run the test
testDirectFileUpload();
