#!/usr/bin/env node

/**
 * Test CORS configuration
 */

const { corsOptions } = require('./src/config/security');

function testCorsOrigin(origin, environment = 'production') {
  // Set environment for testing
  const originalEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = environment;
  
  return new Promise((resolve) => {
    corsOptions.origin(origin, (err, allowed) => {
      // Restore original environment
      process.env.NODE_ENV = originalEnv;
      
      if (err) {
        resolve({ origin, allowed: false, error: err.message });
      } else {
        resolve({ origin, allowed: true });
      }
    });
  });
}

async function runTests() {
  console.log('🧪 Testing CORS Configuration...\n');
  
  const testCases = [
    // Production tests
    { origin: 'https://kanoonwise-li7v.onrender.com', env: 'production' },
    { origin: null, env: 'production' }, // Same-origin request
    { origin: 'https://malicious-site.com', env: 'production' },
    
    // Development tests
    { origin: 'http://localhost:5173', env: 'development' },
    { origin: 'http://localhost:3000', env: 'development' },
    { origin: 'https://malicious-site.com', env: 'development' },
  ];
  
  for (const testCase of testCases) {
    const result = await testCorsOrigin(testCase.origin, testCase.env);
    const status = result.allowed ? '✅ ALLOWED' : '❌ BLOCKED';
    const originDisplay = testCase.origin || '(no origin - same-origin)';
    
    console.log(`${status} [${testCase.env}] ${originDisplay}`);
    if (!result.allowed && result.error) {
      console.log(`   Error: ${result.error}`);
    }
  }
  
  console.log('\n🎉 CORS configuration test completed!');
}

if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testCorsOrigin };
