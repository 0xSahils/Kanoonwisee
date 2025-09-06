/**
 * Frontend File Upload Integration Test
 * Tests the file upload functionality in LawyerInvitation component
 */

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'http://localhost:3000';
const API_URL = `${BASE_URL}/api`;

// Test data
const testData = {
  email: 'test.lawyer@example.com',
  fullName: 'Test Lawyer',
  phone: '9876543210',
  barRegistration: 'BAR123456789',
  experience: '5-10',
  specialization: 'Criminal Law',
  city: 'Mumbai',
  courtPractice: 'High Court',
  message: 'Experienced criminal lawyer with expertise in white-collar crimes.'
};

let authCookies = '';
let csrfToken = '';

async function createTestFiles() {
  console.log('📁 Creating test files...');
  
  // Create test PDF (mock CV)
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
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(Test CV Document) Tj
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
323
%%EOF`;

  fs.writeFileSync(path.join(__dirname, 'test-cv.pdf'), pdfContent);
  
  // Create test image (1x1 PNG)
  const pngBuffer = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
    0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4,
    0x89, 0x00, 0x00, 0x00, 0x0A, 0x49, 0x44, 0x41,
    0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
    0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00,
    0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE,
    0x42, 0x60, 0x82
  ]);
  
  fs.writeFileSync(path.join(__dirname, 'test-photo.png'), pngBuffer);
  fs.writeFileSync(path.join(__dirname, 'test-bar-cert.png'), pngBuffer);
  
  console.log('✅ Test files created successfully');
}

async function requestOtp() {
  console.log('📧 Requesting OTP...');
  
  try {
    const response = await axios.post(`${API_URL}/auth/request-otp`, {
      email: testData.email,
      role: 'lawyer'
    });
    
    console.log('✅ OTP request successful');
    return response.data;
  } catch (error) {
    console.error('❌ OTP request failed:', error.response?.data || error.message);
    throw error;
  }
}

async function verifyOtp() {
  console.log('🔐 Verifying OTP (using mock OTP 123456)...');
  
  try {
    const response = await axios.post(`${API_URL}/auth/verify-otp`, {
      email: testData.email,
      otp: '123456'
    });
    
    // Extract cookies for session
    const cookies = response.headers['set-cookie'];
    if (cookies) {
      authCookies = cookies.join('; ');
    }
    
    console.log('✅ OTP verification successful');
    return response.data;
  } catch (error) {
    console.error('❌ OTP verification failed:', error.response?.data || error.message);
    throw error;
  }
}

async function getCsrfToken() {
  console.log('🔒 Getting CSRF token...');
  
  try {
    const response = await axios.get(`${API_URL}/auth/csrf-token`, {
      headers: {
        'Cookie': authCookies
      }
    });
    
    csrfToken = response.data.csrfToken;
    console.log('✅ CSRF token obtained');
    return csrfToken;
  } catch (error) {
    console.error('❌ CSRF token request failed:', error.response?.data || error.message);
    throw error;
  }
}

async function testJsonProfileUpdate() {
  console.log('\n🧪 Testing JSON Profile Update (without files)...');
  
  try {
    const profileData = {
      full_name: testData.fullName,
      bar_registration_number: testData.barRegistration,
      specialization: [testData.specialization],
      court_practice: [testData.courtPractice],
      fee_structure: {
        consultation: 1000,
        court: 5000,
      },
      years_experience: 7,
      languages: ["English", "Hindi"],
      city: testData.city,
      consultation_type: "both",
      message: testData.message
    };

    const response = await axios.put(`${API_URL}/lawyer/profile`, profileData, {
      headers: {
        'Cookie': authCookies,
        'X-CSRF-Token': csrfToken,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ JSON profile update successful');
    console.log('📊 Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ JSON profile update failed:', error.response?.data || error.message);
    throw error;
  }
}

async function testFileProfileUpdate() {
  console.log('\n🧪 Testing File Profile Update (with files)...');
  
  try {
    const formData = new FormData();
    
    // Add text fields
    formData.append('full_name', testData.fullName + ' Updated');
    formData.append('bar_registration_number', testData.barRegistration);
    formData.append('specialization', JSON.stringify([testData.specialization]));
    formData.append('court_practice', JSON.stringify([testData.courtPractice]));
    formData.append('fee_structure', JSON.stringify({
      consultation: 1200,
      court: 6000,
    }));
    formData.append('years_experience', '8');
    formData.append('languages', JSON.stringify(["English", "Hindi", "Marathi"]));
    formData.append('city', testData.city);
    formData.append('consultation_type', 'both');
    formData.append('message', testData.message + ' - Updated with files');
    
    // Add files
    formData.append('photo', fs.createReadStream(path.join(__dirname, 'test-photo.png')));
    formData.append('cv', fs.createReadStream(path.join(__dirname, 'test-cv.pdf')));
    formData.append('bar_registration_certificate', fs.createReadStream(path.join(__dirname, 'test-bar-cert.png')));

    const response = await axios.put(`${API_URL}/lawyer/profile`, formData, {
      headers: {
        ...formData.getHeaders(),
        'Cookie': authCookies,
        'X-CSRF-Token': csrfToken
      }
    });
    
    console.log('✅ File profile update successful');
    console.log('📊 Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ File profile update failed:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('📋 Error details:', JSON.stringify(error.response.data, null, 2));
    }
    throw error;
  }
}

async function testFileOperations() {
  console.log('\n🧪 Testing File Operations...');
  
  try {
    // Test file listing
    const listResponse = await axios.get(`${API_URL}/lawyer/files`, {
      headers: {
        'Cookie': authCookies,
        'X-CSRF-Token': csrfToken
      }
    });
    
    console.log('✅ File listing successful');
    console.log('📋 Files:', JSON.stringify(listResponse.data, null, 2));
    
    // Test pre-signed URL generation
    if (listResponse.data.files && listResponse.data.files.length > 0) {
      const firstFile = listResponse.data.files[0];
      const urlResponse = await axios.get(`${API_URL}/lawyer/files/${firstFile.key}/url`, {
        headers: {
          'Cookie': authCookies,
          'X-CSRF-Token': csrfToken
        }
      });
      
      console.log('✅ Pre-signed URL generation successful');
      console.log('🔗 URL:', urlResponse.data.url);
    }
    
  } catch (error) {
    console.error('❌ File operations failed:', error.response?.data || error.message);
  }
}

async function cleanupTestFiles() {
  console.log('🧹 Cleaning up test files...');
  
  try {
    const files = ['test-cv.pdf', 'test-photo.png', 'test-bar-cert.png'];
    files.forEach(file => {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
    console.log('✅ Test files cleaned up');
  } catch (error) {
    console.error('⚠️ Cleanup warning:', error.message);
  }
}

async function runIntegrationTest() {
  console.log('🚀 Starting Frontend File Upload Integration Test\n');
  
  try {
    // Setup
    await createTestFiles();
    
    // Authentication flow
    await requestOtp();
    await verifyOtp();
    await getCsrfToken();
    
    // Test both update methods
    await testJsonProfileUpdate();
    await testFileProfileUpdate();
    await testFileOperations();
    
    console.log('\n🎉 All tests completed successfully!');
    
  } catch (error) {
    console.error('\n💥 Test failed:', error.message);
    process.exit(1);
  } finally {
    await cleanupTestFiles();
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Test interrupted');
  await cleanupTestFiles();
  process.exit(0);
});

// Run the test
if (require.main === module) {
  runIntegrationTest();
}

module.exports = {
  runIntegrationTest,
  testData
};
