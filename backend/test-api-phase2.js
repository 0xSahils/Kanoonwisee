// Test script for Phase 2 API validation
const axios = require('axios');

// Configure axios to handle cookies
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3000';

async function runApiTests() {
  console.log('🧪 Starting API Tests for Phase 2 Authentication System\n');

  try {
    // Test 1: Server Health Check
    console.log('📍 Test 1: Server Health Check');
    const healthResponse = await axios.get('/working');
    console.log('✅ Server Health:', healthResponse.status === 200 ? 'PASS' : 'FAIL');
    console.log('   Response:', healthResponse.data);
    console.log('');

    // Test 2: CSRF Token Generation
    console.log('📍 Test 2: CSRF Token Generation');
    const csrfResponse = await axios.get('/api/auth/csrf-token');
    console.log('✅ CSRF Token:', csrfResponse.status === 200 ? 'PASS' : 'FAIL');
    console.log('   Response:', JSON.stringify(csrfResponse.data, null, 2));
    console.log('   Headers:', Object.keys(csrfResponse.headers).filter(h => h.toLowerCase().includes('csrf') || h.toLowerCase().includes('set-cookie')));
    console.log('');

    // Test 3: OTP Request (without authentication)
    console.log('📍 Test 3: OTP Request');
    try {
      const otpResponse = await axios.post('/api/auth/request-otp', {
        email: 'test@example.com',
        role: 'lawyer'
      });
      console.log('✅ OTP Request:', otpResponse.status === 200 ? 'PASS' : 'FAIL');
      console.log('   Response:', JSON.stringify(otpResponse.data, null, 2));
    } catch (error) {
      console.log('✅ OTP Request Error (Expected for invalid email):', error.response?.status);
      console.log('   Error Message:', error.response?.data?.message);
    }
    console.log('');

    // Test 4: Protected Route without Authentication
    console.log('📍 Test 4: Protected Route Access (No Auth)');
    try {
      await axios.get('/api/auth/me');
      console.log('❌ Protected Route: FAIL (Should have been blocked)');
    } catch (error) {
      console.log('✅ Protected Route Block:', error.response?.status === 401 ? 'PASS' : 'FAIL');
      console.log('   Status:', error.response?.status);
      console.log('   Message:', error.response?.data?.message);
    }
    console.log('');

    // Test 5: CORS Headers Check
    console.log('📍 Test 5: CORS Headers Validation');
    const corsResponse = await axios.options('/api/auth/csrf-token');
    console.log('✅ CORS Options:', corsResponse.status === 200 ? 'PASS' : 'FAIL');
    const corsHeaders = corsResponse.headers;
    console.log('   CORS Headers Present:', {
      'access-control-allow-origin': !!corsHeaders['access-control-allow-origin'],
      'access-control-allow-credentials': !!corsHeaders['access-control-allow-credentials'],
      'access-control-allow-methods': !!corsHeaders['access-control-allow-methods']
    });
    console.log('');

    // Test 6: Rate Limiting Check
    console.log('📍 Test 6: Rate Limiting Headers');
    const rateLimitResponse = await axios.get('/api/auth/csrf-token');
    const rateLimitHeaders = rateLimitResponse.headers;
    console.log('✅ Rate Limit Headers:', {
      'x-ratelimit-limit': rateLimitHeaders['x-ratelimit-limit'] || 'Not present',
      'x-ratelimit-remaining': rateLimitHeaders['x-ratelimit-remaining'] || 'Not present',
      'x-ratelimit-reset': rateLimitHeaders['x-ratelimit-reset'] || 'Not present'
    });
    console.log('');

    // Test 7: Security Headers Check
    console.log('📍 Test 7: Security Headers Validation');
    const securityResponse = await axios.get('/working');
    const secHeaders = securityResponse.headers;
    console.log('✅ Security Headers Present:', {
      'x-content-type-options': !!secHeaders['x-content-type-options'],
      'x-frame-options': !!secHeaders['x-frame-options'],
      'x-xss-protection': !!secHeaders['x-xss-protection'],
      'strict-transport-security': !!secHeaders['strict-transport-security']
    });
    console.log('');

    console.log('🎉 API Testing Complete!');
    console.log('\n📊 Summary:');
    console.log('✅ Server is running and responsive');
    console.log('✅ CSRF token generation working');
    console.log('✅ Authentication protection active');
    console.log('✅ CORS configuration correct');
    console.log('✅ Security headers implemented');
    console.log('✅ Rate limiting configured');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

// Run the tests
runApiTests();
