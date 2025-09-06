const axios = require('axios');
const FormData = require('form-data');

async function simpleFileTest() {
  console.log('🚀 Testing simple file upload...');
  
  try {
    // Create a simple test with axios
    const response = await axios.get('http://localhost:3000/working');
    console.log('✅ Server is running:', response.data);
    
    // Test S3 connection endpoint
    const s3Test = await axios.get('http://localhost:3000/api/health/s3-status');
    console.log('✅ S3 status:', s3Test.data);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

simpleFileTest();
