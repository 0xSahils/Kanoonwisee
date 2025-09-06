const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const TEST_EMAIL = 'test.files.upload@example.com';

async function testFileUploadRegistration() {
  try {
    console.log('🚀 Testing file upload registration...\n');

    // Step 1: Request OTP
    console.log('📧 Step 1: Requesting OTP...');
    await axios.post(`${BASE_URL}/api/auth/request-otp`, {
      email: TEST_EMAIL
    });
    console.log('✅ OTP requested successfully');

    // Step 2: Get the OTP from database
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
      name: 'Test Lawyer File Upload',
      password: 'TestPassword123!'
    });

    console.log('✅ User registered successfully');
    const authToken = registerResponse.data.access_token;

    // Step 4: Get CSRF token
    console.log('\\n🛡️ Step 3: Getting CSRF token...');
    const csrfResponse = await axios.get(`${BASE_URL}/api/auth/csrf-token`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      withCredentials: true
    });
    const csrfToken = csrfResponse.data.csrfToken;
    console.log('✅ CSRF token obtained');

    // Step 5: Create form data with files
    console.log('\\n📎 Step 4: Preparing file upload...');
    const formData = new FormData();

    // Add CSRF token
    formData.append('csrfToken', csrfToken);

    // Add profile data
    formData.append('full_name', 'Test Lawyer File Upload');
    formData.append('bar_registration_number', 'TEST' + Date.now());
    formData.append('specialization', JSON.stringify(['Civil Law']));
    formData.append('court_practice', JSON.stringify(['High Court']));
    formData.append('fee_structure', JSON.stringify({
      consultation: 1000,
      court: 5000,
    }));
    formData.append('years_experience', '5');
    formData.append('languages', JSON.stringify(['English', 'Hindi']));
    formData.append('city', 'Test City');
    formData.append('consultation_type', 'both');

    // Create test files
    const testImageBuffer = Buffer.from('fake-image-data-for-testing-' + Date.now(), 'utf8');
    const testPdfBuffer = Buffer.from('fake-pdf-data-for-testing-' + Date.now(), 'utf8');

    // Add test files
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

    // Step 6: Upload profile with files
    const profileResponse = await axios.put(
      `${BASE_URL}/api/lawyer/profile`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          ...formData.getHeaders()
        },
        timeout: 60000,
        withCredentials: true
      }
    );

    console.log('\\n✅ Profile upload successful!');
    console.log('📊 Response:', JSON.stringify(profileResponse.data, null, 2));
    
    // Check if files were actually stored
    if (profileResponse.data.profile && profileResponse.data.profile.files) {
      const files = profileResponse.data.profile.files;
      console.log('\\n📁 File upload status:');
      console.log(`  Photo: ${files.photo.hasFile ? '✅ Uploaded' : '❌ Not uploaded'}`);
      console.log(`  CV: ${files.cv.hasFile ? '✅ Uploaded' : '❌ Not uploaded'}`);
      console.log(`  Bar Certificate: ${files.bar_registration_file.hasFile ? '✅ Uploaded' : '❌ Not uploaded'}`);
      
      if (files.photo.hasFile) {
        console.log(`  Photo key: ${files.photo.key}`);
      }
      if (files.cv.hasFile) {
        console.log(`  CV key: ${files.cv.key}`);
      }
      if (files.bar_registration_file.hasFile) {
        console.log(`  Bar cert key: ${files.bar_registration_file.key}`);
      }
    }
    
    console.log('\\n🎉 File upload test completed successfully!');

  } catch (error) {
    console.error('\\n❌ Test failed:', error.message);
    if (error.response) {
      console.error('📋 Response data:', error.response.data);
      console.error('📋 Response status:', error.response.status);
    }
    console.error('📋 Stack trace:', error.stack);
    process.exit(1);
  }
}

// Run the test
testFileUploadRegistration();
