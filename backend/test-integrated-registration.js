const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const TEST_EMAIL = 'test-lawyer-registration@kanoonwise.com';

// Test file paths (create these test files or use existing ones)
const TEST_FILES = {
  photo: path.join(__dirname, 'test-files', 'test-photo.jpg'),
  cv: path.join(__dirname, 'test-files', 'test-cv.pdf'),
  bar_registration_file: path.join(__dirname, 'test-files', 'test-bar-registration.pdf')
};

let authToken = '';
let csrfToken = '';

/**
 * Create test files if they don't exist
 */
function createTestFiles() {
  const testFilesDir = path.join(__dirname, 'test-files');
  
  if (!fs.existsSync(testFilesDir)) {
    fs.mkdirSync(testFilesDir, { recursive: true });
  }
  
  // Create dummy files for testing
  if (!fs.existsSync(TEST_FILES.photo)) {
    fs.writeFileSync(TEST_FILES.photo, Buffer.from('fake-image-data'), 'binary');
  }
  
  if (!fs.existsSync(TEST_FILES.cv)) {
    fs.writeFileSync(TEST_FILES.cv, Buffer.from('fake-pdf-data'), 'binary');
  }
  
  if (!fs.existsSync(TEST_FILES.bar_registration_file)) {
    fs.writeFileSync(TEST_FILES.bar_registration_file, Buffer.from('fake-registration-pdf'), 'binary');
  }
}

/**
 * Test complete lawyer registration flow with files
 */
async function testLawyerRegistrationWithFiles() {
  try {
    console.log('🚀 Starting integrated lawyer registration test...\n');
    
    // Step 0: Test S3 connectivity first
    console.log('🔗 Step 0: Testing S3 connectivity...');
    try {
      const healthResponse = await axios.get(`${BASE_URL}/api/health/s3`);
      if (healthResponse.data.status === 'success') {
        console.log('✅ S3 connection verified');
      } else {
        console.warn('⚠️ S3 connection issue detected:', healthResponse.data.message);
      }
    } catch (s3Error) {
      console.warn('⚠️ Could not verify S3 connection:', s3Error.response?.data?.message || s3Error.message);
    }
    
    // Step 1: Request OTP
    console.log('\n📧 Step 1: Requesting OTP...');
    const otpResponse = await axios.post(`${BASE_URL}/api/auth/request-otp`, {
      email: TEST_EMAIL,
      role: 'lawyer'
    });
    
    console.log('✅ OTP requested successfully');
    
    // Step 2: Verify OTP (in real scenario, get OTP from email)
    console.log('\n🔐 Step 2: Verifying OTP...');
    const testOtp = '123456'; // This would come from email in real scenario
    
    const verifyResponse = await axios.post(`${BASE_URL}/api/auth/verify-otp`, {
      email: TEST_EMAIL,
      otp: testOtp
    }, { withCredentials: true });
    
    console.log('✅ OTP verified successfully');
    
    // Step 3: Get CSRF token
    console.log('\n🛡️ Step 3: Getting CSRF token...');
    const csrfResponse = await axios.get(`${BASE_URL}/api/auth/csrf-token`, {
      withCredentials: true
    });
    
    csrfToken = csrfResponse.data.csrfToken;
    console.log('✅ CSRF token obtained');
    
    // Step 4: Create lawyer profile with files using the integrated endpoint
    console.log('\n📋 Step 4: Creating lawyer profile with files...');
    
    const formData = new FormData();
    
    // Add profile data (same as frontend registration)
    formData.append('full_name', 'Test Lawyer Registration');
    formData.append('bar_registration_number', 'BAR-REG-INTEGRATED-123');
    formData.append('specialization', JSON.stringify(['Criminal Law']));
    formData.append('court_practice', JSON.stringify(['High Court']));
    formData.append('fee_structure', JSON.stringify({
      consultation: 1000,
      court: 5000
    }));
    formData.append('years_experience', '5');
    formData.append('languages', JSON.stringify(['English', 'Hindi']));
    formData.append('city', 'Delhi');
    formData.append('state', 'Delhi');
    formData.append('consultation_type', 'both');
    
    // Add files
    if (fs.existsSync(TEST_FILES.photo)) {
      formData.append('photo', fs.createReadStream(TEST_FILES.photo), {
        filename: 'test-photo.jpg',
        contentType: 'image/jpeg'
      });
    }
    
    if (fs.existsSync(TEST_FILES.cv)) {
      formData.append('cv', fs.createReadStream(TEST_FILES.cv), {
        filename: 'test-cv.pdf',
        contentType: 'application/pdf'
      });
    }
    
    if (fs.existsSync(TEST_FILES.bar_registration_file)) {
      formData.append('bar_registration_file', fs.createReadStream(TEST_FILES.bar_registration_file), {
        filename: 'test-bar-registration.pdf',
        contentType: 'application/pdf'
      });
    }
    
    // Use the integrated lawyer profile endpoint
    const profileResponse = await axios.put(`${BASE_URL}/api/lawyer/profile`, formData, {
      headers: {
        ...formData.getHeaders(),
        'X-CSRF-Token': csrfToken
      },
      withCredentials: true
    });
    
    console.log('✅ Lawyer profile created successfully with files');
    console.log('📄 Profile Response:', JSON.stringify(profileResponse.data, null, 2));
    
    // Step 5: Test getting profile with file metadata
    console.log('\n📋 Step 5: Getting profile with file metadata...');
    const getProfileResponse = await axios.get(`${BASE_URL}/api/lawyer/profile`, {
      withCredentials: true
    });
    
    console.log('✅ Profile retrieved successfully');
    console.log('📄 Profile Data:', JSON.stringify(getProfileResponse.data, null, 2));
    
    // Step 6: Test getting file URLs
    console.log('\n🔗 Step 6: Getting file URLs...');
    const urlsResponse = await axios.get(`${BASE_URL}/api/lawyer/profile/files/urls`, {
      withCredentials: true
    });
    
    console.log('✅ File URLs generated successfully');
    console.log('📄 URLs:', JSON.stringify(urlsResponse.data, null, 2));
    
    // Step 7: Test file metadata endpoint
    console.log('\n📊 Step 7: Getting file metadata...');
    const metadataResponse = await axios.get(`${BASE_URL}/api/lawyer/profile/files/metadata`, {
      withCredentials: true
    });
    
    console.log('✅ File metadata retrieved successfully');
    console.log('📄 Metadata:', JSON.stringify(metadataResponse.data, null, 2));
    
    console.log('\n🎉 Complete lawyer registration flow test completed successfully!');
    
  } catch (error) {
    console.error('❌ Registration flow test failed:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Test lawyer registration without files (backward compatibility)
 */
async function testLawyerRegistrationWithoutFiles() {
  try {
    console.log('\n🔄 Testing backward compatibility (registration without files)...\n');
    
    const TEST_EMAIL_NO_FILES = 'test-lawyer-no-files@kanoonwise.com';
    
    // Step 1: Request OTP
    console.log('📧 Step 1: Requesting OTP...');
    await axios.post(`${BASE_URL}/api/auth/request-otp`, {
      email: TEST_EMAIL_NO_FILES,
      role: 'lawyer'
    });
    
    // Step 2: Verify OTP
    console.log('🔐 Step 2: Verifying OTP...');
    await axios.post(`${BASE_URL}/api/auth/verify-otp`, {
      email: TEST_EMAIL_NO_FILES,
      otp: '123456'
    }, { withCredentials: true });
    
    // Step 3: Get CSRF token
    console.log('🛡️ Step 3: Getting CSRF token...');
    const csrfResponse = await axios.get(`${BASE_URL}/api/auth/csrf-token`, {
      withCredentials: true
    });
    
    const csrfToken = csrfResponse.data.csrfToken;
    
    // Step 4: Create profile without files (JSON data)
    console.log('📋 Step 4: Creating profile without files...');
    
    const profileData = {
      full_name: 'Test Lawyer No Files',
      bar_registration_number: 'BAR-NO-FILES-456',
      specialization: ['Civil Law'],
      court_practice: ['District Court'],
      fee_structure: {
        consultation: 800,
        court: 4000
      },
      years_experience: 3,
      languages: ['English'],
      city: 'Mumbai',
      state: 'Maharashtra',
      consultation_type: 'online'
    };
    
    const profileResponse = await axios.put(`${BASE_URL}/api/lawyer/profile`, profileData, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      withCredentials: true
    });
    
    console.log('✅ Profile created successfully without files');
    console.log('📄 Response:', JSON.stringify(profileResponse.data, null, 2));
    
    console.log('\n🎉 Backward compatibility test completed successfully!');
    
  } catch (error) {
    console.error('❌ Backward compatibility test failed:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Test profile update with partial files
 */
async function testProfileUpdateWithPartialFiles() {
  try {
    console.log('\n🔄 Testing profile update with partial files...\n');
    
    // Assume we're still authenticated from previous test
    console.log('📋 Updating profile with only photo...');
    
    const formData = new FormData();
    
    // Update some profile data
    formData.append('city', 'Bangalore');
    formData.append('state', 'Karnataka');
    
    // Add only photo file
    if (fs.existsSync(TEST_FILES.photo)) {
      formData.append('photo', fs.createReadStream(TEST_FILES.photo), {
        filename: 'updated-photo.jpg',
        contentType: 'image/jpeg'
      });
    }
    
    const updateResponse = await axios.put(`${BASE_URL}/api/lawyer/profile`, formData, {
      headers: {
        ...formData.getHeaders(),
        'X-CSRF-Token': csrfToken
      },
      withCredentials: true
    });
    
    console.log('✅ Profile updated successfully with partial files');
    console.log('📄 Response:', JSON.stringify(updateResponse.data, null, 2));
    
  } catch (error) {
    console.error('❌ Profile update test failed:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Run all tests
 */
async function runIntegratedTests() {
  try {
    // Create test files
    createTestFiles();
    
    // Run all tests
    await testLawyerRegistrationWithFiles();
    await testLawyerRegistrationWithoutFiles();
    await testProfileUpdateWithPartialFiles();
    
    console.log('\n🎉 All integrated registration tests completed successfully!');
    
  } catch (error) {
    console.error('\n💥 Integrated test suite failed:', error.message);
    process.exit(1);
  }
}

// Cleanup function
function cleanup() {
  try {
    const testFilesDir = path.join(__dirname, 'test-files');
    if (fs.existsSync(testFilesDir)) {
      fs.rmSync(testFilesDir, { recursive: true, force: true });
      console.log('🧹 Test files cleaned up');
    }
  } catch (error) {
    console.warn('⚠️ Cleanup warning:', error.message);
  }
}

// Handle process termination
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Run tests if this file is executed directly
if (require.main === module) {
  runIntegratedTests().finally(cleanup);
}

module.exports = {
  runIntegratedTests,
  testLawyerRegistrationWithFiles,
  testLawyerRegistrationWithoutFiles,
  testProfileUpdateWithPartialFiles
};
