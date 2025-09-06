const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const API_URL = `${BASE_URL}/api`;
const TEST_EMAIL = 'test-lawyer-upload@kanoonwise.com';

// Set up axios instance with cookie support
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 30000
});

// Test file paths
const TEST_FILES = {
  photo: path.join(__dirname, 'test-files', 'test-photo.jpg'),
  cv: path.join(__dirname, 'test-files', 'test-cv.pdf'),
  bar_registration_certificate: path.join(__dirname, 'test-files', 'test-bar-cert.jpg')
};

let csrfToken = '';

/**
 * Create test files with proper content
 */
function createTestFiles() {
  const testFilesDir = path.join(__dirname, 'test-files');
  
  if (!fs.existsSync(testFilesDir)) {
    fs.mkdirSync(testFilesDir, { recursive: true });
    console.log('📁 Created test-files directory');
  }
  
  // Create a simple JPEG image (1x1 pixel)
  if (!fs.existsSync(TEST_FILES.photo)) {
    const jpegBuffer = Buffer.from([
      0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01,
      0x01, 0x01, 0x00, 0x48, 0x00, 0x48, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43,
      0x00, 0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08, 0x07, 0x07, 0x07, 0x09,
      0x09, 0x08, 0x0A, 0x0C, 0x14, 0x0D, 0x0C, 0x0B, 0x0B, 0x0C, 0x19, 0x12,
      0x13, 0x0F, 0x14, 0x1D, 0x1A, 0x1F, 0x1E, 0x1D, 0x1A, 0x1C, 0x1C, 0x20,
      0x24, 0x2E, 0x27, 0x20, 0x22, 0x2C, 0x23, 0x1C, 0x1C, 0x28, 0x37, 0x29,
      0x2C, 0x30, 0x31, 0x34, 0x34, 0x34, 0x1F, 0x27, 0x39, 0x3D, 0x38, 0x32,
      0x3C, 0x2E, 0x33, 0x34, 0x32, 0xFF, 0xC0, 0x00, 0x11, 0x08, 0x00, 0x01,
      0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0x02, 0x11, 0x01, 0x03, 0x11, 0x01,
      0xFF, 0xC4, 0x00, 0x14, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0xFF, 0xC4,
      0x00, 0x14, 0x10, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xDA, 0x00, 0x0C,
      0x03, 0x01, 0x00, 0x02, 0x11, 0x03, 0x11, 0x00, 0x3F, 0x00, 0x8A, 0xFF, 0xD9
    ]);
    fs.writeFileSync(TEST_FILES.photo, jpegBuffer);
    console.log('📷 Created test photo file');
  }
  
  // Create a simple PDF
  if (!fs.existsSync(TEST_FILES.cv)) {
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 75
>>
stream
BT
/F1 12 Tf
72 720 Td
(Test CV for File Upload Testing - KanoonWise Lawyer Profile) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000136 00000 n 
0000000229 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
354
%%EOF`;
    fs.writeFileSync(TEST_FILES.cv, pdfContent);
    console.log('📄 Created test CV file');
  }
  
  // Create bar registration certificate (same as photo for simplicity)
  if (!fs.existsSync(TEST_FILES.bar_registration_certificate)) {
    fs.copyFileSync(TEST_FILES.photo, TEST_FILES.bar_registration_certificate);
    console.log('📜 Created test bar registration certificate');
  }
  
  console.log('✅ All test files created successfully');
}

/**
 * Authenticate user and get tokens
 */
async function authenticate() {
  try {
    console.log('\n🔐 Starting authentication process...');
    
    // Step 1: Request OTP
    console.log(`📧 Requesting OTP for ${TEST_EMAIL}...`);
    const otpResponse = await apiClient.post('/auth/request-otp', {
      email: TEST_EMAIL,
      role: 'lawyer'
    });
    
    console.log('✅ OTP requested successfully');
    console.log('📋 Please check your email for the OTP');
    
    // Step 2: Get OTP from user input (in real testing, you'd get this from email)
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const userOtp = await new Promise((resolve) => {
      rl.question('🔢 Enter the OTP from your email: ', (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    });
    
    if (!userOtp || userOtp.length !== 6) {
      throw new Error('Invalid OTP format. Please provide a 6-digit OTP.');
    }
    
    // Step 3: Verify OTP
    console.log('🔍 Verifying OTP...');
    const verifyResponse = await apiClient.post('/auth/verify-otp', {
      email: TEST_EMAIL,
      otp: userOtp
    });
    
    console.log('✅ OTP verified successfully');
    
    // Step 4: Get CSRF token
    console.log('🔒 Getting CSRF token...');
    const csrfResponse = await apiClient.get('/auth/csrf-token');
    
    csrfToken = csrfResponse.data.csrfToken;
    console.log('✅ CSRF token obtained');
    
    // Add CSRF token to default headers
    apiClient.defaults.headers.common['X-CSRF-Token'] = csrfToken;
    
    console.log('🎉 Authentication completed successfully');
    
  } catch (error) {
    console.error('❌ Authentication failed:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Test file upload functionality via profile update
 */
async function testFileUpload() {
  try {
    console.log('\n📁 Testing file upload via profile update...');
    
    const formData = new FormData();
    
    // Add required profile data
    formData.append('full_name', 'Test Lawyer File Upload');
    formData.append('bar_registration_number', 'BAR-UPLOAD-TEST-123456');
    formData.append('city', 'Delhi');
    formData.append('consultation_type', 'both');
    formData.append('years_experience', '5');
    formData.append('specialization', JSON.stringify(['Criminal Law']));
    formData.append('court_practice', JSON.stringify(['High Court']));
    formData.append('fee_structure', JSON.stringify({
      consultation: 1500,
      court: 7500
    }));
    formData.append('languages', JSON.stringify(['English', 'Hindi']));
    
    // Add files
    console.log('📎 Adding files to form data...');
    
    if (fs.existsSync(TEST_FILES.photo)) {
      formData.append('photo', fs.createReadStream(TEST_FILES.photo), {
        filename: 'test-photo.jpg',
        contentType: 'image/jpeg'
      });
      console.log('  ✓ Added photo file');
    }
    
    if (fs.existsSync(TEST_FILES.cv)) {
      formData.append('cv', fs.createReadStream(TEST_FILES.cv), {
        filename: 'test-cv.pdf',
        contentType: 'application/pdf'
      });
      console.log('  ✓ Added CV file');
    }
    
    if (fs.existsSync(TEST_FILES.bar_registration_certificate)) {
      formData.append('bar_registration_certificate', fs.createReadStream(TEST_FILES.bar_registration_certificate), {
        filename: 'test-bar-cert.jpg',
        contentType: 'image/jpeg'
      });
      console.log('  ✓ Added bar registration certificate');
    }
    
    console.log('🚀 Uploading files and updating profile...');
    
    const response = await apiClient.put('/lawyer/profile', formData, {
      headers: {
        ...formData.getHeaders()
      }
    });
    
    console.log('✅ File upload and profile update successful');
    console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    
    return response.data;
    
  } catch (error) {
    console.error('❌ File upload failed:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('📋 Error details:', JSON.stringify(error.response.data, null, 2));
    }
    throw error;
  }
}

/**
 * Test getting file metadata
 */
async function testGetFileMetadata() {
  try {
    console.log('\n📋 Testing file metadata retrieval...');
    
    const response = await apiClient.get('/lawyer/profile/files/metadata');
    
    console.log('✅ File metadata retrieved successfully');
    console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    
    return response.data;
    
  } catch (error) {
    console.error('❌ File metadata retrieval failed:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Test getting pre-signed URLs
 */
async function testGetFileUrls() {
  try {
    console.log('\n🔗 Testing pre-signed URL generation...');
    
    const response = await apiClient.get('/lawyer/profile/files/urls');
    
    console.log('✅ Pre-signed URLs generated successfully');
    console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    
    // Test accessing a file using the pre-signed URL
    if (response.data.urls && Object.keys(response.data.urls).length > 0) {
      const firstFileType = Object.keys(response.data.urls)[0];
      const firstFileUrl = response.data.urls[firstFileType];
      
      if (firstFileUrl) {
        console.log(`\n🔍 Testing file access via pre-signed URL for ${firstFileType}...`);
        try {
          const fileResponse = await axios.get(firstFileUrl, {
            responseType: 'arraybuffer',
            timeout: 10000
          });
          console.log('✅ File accessed successfully via pre-signed URL');
          console.log(`📏 File size: ${fileResponse.data.byteLength} bytes`);
          console.log(`📋 Content type: ${fileResponse.headers['content-type']}`);
        } catch (fileError) {
          console.error('❌ File access failed:', fileError.message);
        }
      }
    } else {
      console.log('ℹ️ No files found to test URL access');
    }
    
    return response.data;
    
  } catch (error) {
    console.error('❌ Pre-signed URL generation failed:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Test file deletion
 */
async function testFileDelete() {
  try {
    console.log('\n🗑️ Testing file deletion...');
    
    // Try to delete the photo file
    const response = await apiClient.delete('/lawyer/profile/files/photo');
    
    console.log('✅ File deleted successfully');
    console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    
    return response.data;
    
  } catch (error) {
    if (error.response?.status === 404) {
      console.log('ℹ️ Photo file not found (may have already been deleted)');
    } else {
      console.error('❌ File deletion failed:', error.response?.data || error.message);
      throw error;
    }
  }
}

/**
 * Test JSON profile update (without files) to ensure backward compatibility
 */
async function testJsonProfileUpdate() {
  try {
    console.log('\n📄 Testing JSON profile update (backward compatibility)...');
    
    const profileData = {
      full_name: 'Test Lawyer JSON Update',
      bar_registration_number: 'BAR-JSON-TEST-789',
      city: 'Mumbai',
      consultation_type: 'online',
      years_experience: 3,
      specialization: ['Civil Law'],
      court_practice: ['District Court'],
      fee_structure: {
        consultation: 1200,
        court: 6000
      },
      languages: ['English', 'Marathi']
    };
    
    const response = await apiClient.put('/lawyer/profile', profileData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ JSON profile update successful');
    console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    
    return response.data;
    
  } catch (error) {
    console.error('❌ JSON profile update failed:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Test getting current profile
 */
async function testGetProfile() {
  try {
    console.log('\n👤 Testing profile retrieval...');
    
    const response = await apiClient.get('/lawyer/profile');
    
    console.log('✅ Profile retrieved successfully');
    console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    
    return response.data;
    
  } catch (error) {
    console.error('❌ Profile retrieval failed:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Test error scenarios
 */
async function testErrorScenarios() {
  try {
    console.log('\n⚠️ Testing error scenarios...');
    
    // Test 1: Try to upload files without required profile data
    console.log('🧪 Test 1: Upload without required profile data...');
    try {
      const formData = new FormData();
      formData.append('photo', fs.createReadStream(TEST_FILES.photo));
      
      await apiClient.put('/lawyer/profile', formData, {
        headers: {
          ...formData.getHeaders()
        }
      });
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('  ✅ Validation error handled correctly:', error.response.data.message);
      } else {
        console.log('  ⚠️ Unexpected error:', error.response?.status, error.response?.data);
      }
    }
    
    // Test 2: Try to get files when none exist (after deletion)
    console.log('🧪 Test 2: Get file URLs when files don\'t exist...');
    try {
      const response = await apiClient.get('/lawyer/profile/files/urls');
      console.log('  ℹ️ No files response:', response.data);
    } catch (error) {
      console.log('  ✅ No files error handled correctly:', error.response?.data);
    }
    
    // Test 3: Try to delete non-existent file
    console.log('🧪 Test 3: Delete non-existent file...');
    try {
      await apiClient.delete('/lawyer/profile/files/nonexistent');
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('  ✅ File not found error handled correctly');
      } else {
        console.log('  ⚠️ Unexpected error:', error.response?.status, error.response?.data);
      }
    }
    
    console.log('✅ Error scenario testing completed');
    
  } catch (error) {
    console.error('❌ Error scenario testing failed:', error.message);
  }
}

/**
 * Test S3 connection health endpoint
 */
async function testS3Health() {
  try {
    console.log('\n🏥 Testing S3 health endpoint...');
    
    const response = await apiClient.get('/health/s3');
    
    console.log('✅ S3 health check successful');
    console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    
    return response.data;
    
  } catch (error) {
    console.error('❌ S3 health check failed:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Run all tests in sequence
 */
async function runTests() {
  try {
    console.log('🚀 Starting comprehensive file upload API tests...\n');
    console.log('📋 Test configuration:');
    console.log(`   API URL: ${API_URL}`);
    console.log(`   Test Email: ${TEST_EMAIL}`);
    console.log('');
    
    // Step 1: Create test files
    createTestFiles();
    
    // Step 2: Test S3 connection
    await testS3Health();
    
    // Step 3: Authenticate user
    await authenticate();
    
    // Step 4: Test JSON profile update (backward compatibility)
    await testJsonProfileUpdate();
    
    // Step 5: Test file upload via profile update
    await testFileUpload();
    
    // Step 6: Test profile retrieval
    await testGetProfile();
    
    // Step 7: Test file metadata retrieval
    await testGetFileMetadata();
    
    // Step 8: Test pre-signed URL generation
    await testGetFileUrls();
    
    // Step 9: Test file deletion
    await testFileDelete();
    
    // Step 10: Test error scenarios
    await testErrorScenarios();
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('📊 Summary: File upload integration is working correctly');
    
  } catch (error) {
    console.error('\n💥 Test suite failed:', error.message);
    if (error.response) {
      console.error('📋 Error response:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

/**
 * Cleanup function
 */
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
process.on('SIGINT', () => {
  console.log('\n🛑 Test interrupted by user');
  cleanup();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Test terminated');
  cleanup();
  process.exit(0);
});

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().finally(() => {
    cleanup();
  });
}

module.exports = {
  runTests,
  authenticate,
  testFileUpload,
  testGetFileMetadata,
  testGetFileUrls,
  testFileDelete,
  testJsonProfileUpdate,
  testGetProfile,
  testErrorScenarios,
  testS3Health
};
