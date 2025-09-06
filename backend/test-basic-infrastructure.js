/**
 * Simple File Upload Test Script
 * A non-interactive version for quick testing
 */

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'http://localhost:3000';
const API_URL = `${BASE_URL}/api`;

// Set up axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 30000
});

/**
 * Test S3 connectivity
 */
async function testS3Connection() {
  try {
    console.log('🔗 Testing S3 connection...');
    
    const response = await apiClient.get('/health/s3');
    
    console.log('✅ S3 connection test successful');
    console.log('📊 S3 Status:', response.data);
    
    return true;
  } catch (error) {
    console.error('❌ S3 connection test failed:', error.response?.data || error.message);
    return false;
  }
}

/**
 * Test that the API is responding
 */
async function testApiHealth() {
  try {
    console.log('🏥 Testing API health...');
    
    // Try to get CSRF token (this doesn't require auth)
    const response = await apiClient.get('/auth/csrf-token');
    
    console.log('✅ API is responding');
    console.log('🔒 CSRF token available:', !!response.data.csrfToken);
    
    return true;
  } catch (error) {
    console.error('❌ API health test failed:', error.response?.data || error.message);
    return false;
  }
}

/**
 * Test file upload endpoint structure
 */
async function testEndpointStructure() {
  try {
    console.log('🛠️ Testing endpoint structure...');
    
    // Test various endpoints to see their response structure
    const endpoints = [
      { path: '/health/s3', name: 'S3 Health' },
      { path: '/auth/csrf-token', name: 'CSRF Token' }
    ];
    
    for (const endpoint of endpoints) {
      try {
        const response = await apiClient.get(endpoint.path);
        console.log(`  ✅ ${endpoint.name}: ${response.status} - ${JSON.stringify(response.data).substring(0, 100)}...`);
      } catch (error) {
        console.log(`  ❌ ${endpoint.name}: ${error.response?.status} - ${error.response?.data?.message || 'Failed'}`);
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Endpoint structure test failed:', error.message);
    return false;
  }
}

/**
 * Create and test file creation
 */
function testFileCreation() {
  try {
    console.log('📁 Testing file creation...');
    
    const testFilesDir = path.join(__dirname, 'test-files');
    
    if (!fs.existsSync(testFilesDir)) {
      fs.mkdirSync(testFilesDir, { recursive: true });
      console.log('  ✅ Created test-files directory');
    }
    
    // Create a simple test image
    const testImagePath = path.join(testFilesDir, 'test-image.jpg');
    const jpegHeader = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0]);
    fs.writeFileSync(testImagePath, jpegHeader);
    console.log('  ✅ Created test image file');
    
    // Create a simple test PDF
    const testPdfPath = path.join(testFilesDir, 'test-cv.pdf');
    const pdfContent = '%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n>>\nendobj\n%%EOF';
    fs.writeFileSync(testPdfPath, pdfContent);
    console.log('  ✅ Created test PDF file');
    
    return { testImagePath, testPdfPath };
  } catch (error) {
    console.error('❌ File creation test failed:', error.message);
    return null;
  }
}

/**
 * Test FormData creation
 */
function testFormDataCreation(filePaths) {
  try {
    console.log('📝 Testing FormData creation...');
    
    const formData = new FormData();
    
    // Add text fields
    formData.append('full_name', 'Test User');
    formData.append('test_field', 'test_value');
    
    // Add files if available
    if (filePaths && filePaths.testImagePath && fs.existsSync(filePaths.testImagePath)) {
      formData.append('photo', fs.createReadStream(filePaths.testImagePath), {
        filename: 'test-photo.jpg',
        contentType: 'image/jpeg'
      });
      console.log('  ✅ Added image to FormData');
    }
    
    if (filePaths && filePaths.testPdfPath && fs.existsSync(filePaths.testPdfPath)) {
      formData.append('cv', fs.createReadStream(filePaths.testPdfPath), {
        filename: 'test-cv.pdf',
        contentType: 'application/pdf'
      });
      console.log('  ✅ Added PDF to FormData');
    }
    
    console.log('  ✅ FormData created successfully');
    
    return formData;
  } catch (error) {
    console.error('❌ FormData creation test failed:', error.message);
    return null;
  }
}

/**
 * Run basic tests without authentication
 */
async function runBasicTests() {
  console.log('🚀 Running basic file upload infrastructure tests...\n');
  
  const results = {
    api: false,
    s3: false,
    endpoints: false,
    files: false,
    formData: false
  };
  
  try {
    // Test 1: API Health
    results.api = await testApiHealth();
    
    // Test 2: S3 Connection
    results.s3 = await testS3Connection();
    
    // Test 3: Endpoint Structure
    results.endpoints = await testEndpointStructure();
    
    // Test 4: File Creation
    const filePaths = testFileCreation();
    results.files = !!filePaths;
    
    // Test 5: FormData Creation
    if (filePaths) {
      const formData = testFormDataCreation(filePaths);
      results.formData = !!formData;
    }
    
    // Summary
    console.log('\n📊 Test Results Summary:');
    console.log('============================');
    console.log(`API Health:        ${results.api ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`S3 Connection:     ${results.s3 ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Endpoint Tests:    ${results.endpoints ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`File Creation:     ${results.files ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`FormData Creation: ${results.formData ? '✅ PASS' : '❌ FAIL'}`);
    
    const passCount = Object.values(results).filter(Boolean).length;
    const totalCount = Object.keys(results).length;
    
    console.log(`\n🎯 Overall Score: ${passCount}/${totalCount} tests passed`);
    
    if (passCount === totalCount) {
      console.log('🎉 All basic infrastructure tests passed!');
      console.log('📋 Ready for full authentication testing with: node test-file-upload-complete.js');
    } else {
      console.log('⚠️ Some infrastructure tests failed. Please check the configuration.');
    }
    
    // Cleanup
    try {
      const testFilesDir = path.join(__dirname, 'test-files');
      if (fs.existsSync(testFilesDir)) {
        fs.rmSync(testFilesDir, { recursive: true, force: true });
        console.log('🧹 Test files cleaned up');
      }
    } catch (cleanupError) {
      console.warn('⚠️ Cleanup warning:', cleanupError.message);
    }
    
  } catch (error) {
    console.error('\n💥 Basic tests failed:', error.message);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Test interrupted');
  process.exit(0);
});

// Run tests if this file is executed directly
if (require.main === module) {
  runBasicTests();
}

module.exports = {
  runBasicTests,
  testS3Connection,
  testApiHealth,
  testEndpointStructure
};
