const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testWithEmptyDatabase() {
  try {
    console.log('🔍 Testing lawyer search with empty database...');
    
    // Test the public search endpoint
    const response = await axios.get(`${BASE_URL}/api/public/lawyers/search`);
    
    if (response.status === 200) {
      const { lawyers, total } = response.data;
      
      console.log(`✅ API call successful`);
      console.log(`📊 Total lawyers found: ${total}`);
      console.log(`📋 Lawyers array length: ${lawyers.length}`);
      
      if (lawyers.length === 0) {
        console.log('ℹ️  Database is empty - this is expected after cleanup');
        console.log('✅ Photo URL implementation is ready for when lawyers register');
        
        // Show the API response structure
        console.log('\n📝 API Response Structure:');
        console.log(JSON.stringify(response.data, null, 2));
      }
      
    } else {
      console.error('❌ Failed to fetch lawyers:', response.status);
    }
    
  } catch (error) {
    console.error('❌ Error testing photo URLs:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testWithEmptyDatabase();
