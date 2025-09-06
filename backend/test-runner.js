#!/usr/bin/env node

/**
 * KanoonWise File Upload Test Runner
 * 
 * This script provides different levels of testing for the file upload functionality.
 * 
 * Usage:
 *   node test-runner.js basic       # Run basic infrastructure tests (no auth required)
 *   node test-runner.js full        # Run full integration tests (requires email OTP)
 *   node test-runner.js help        # Show this help message
 */

const { spawn } = require('child_process');
const path = require('path');

const TESTS = {
  basic: {
    file: 'test-basic-infrastructure.js',
    description: 'Run basic infrastructure tests (API health, S3 connection, file creation)',
    requiresAuth: false
  },
  full: {
    file: 'test-file-upload-complete.js',
    description: 'Run complete integration tests (requires email OTP verification)',
    requiresAuth: true
  }
};

function showHelp() {
  console.log('🚀 KanoonWise File Upload Test Runner\n');
  console.log('Usage: node test-runner.js <test-type>\n');
  console.log('Available tests:');
  
  for (const [key, test] of Object.entries(TESTS)) {
    console.log(`  ${key.padEnd(10)} - ${test.description}`);
    if (test.requiresAuth) {
      console.log(`${' '.repeat(15)}⚠️  Requires email OTP verification`);
    }
  }
  
  console.log('\nExamples:');
  console.log('  node test-runner.js basic   # Quick infrastructure check');
  console.log('  node test-runner.js full    # Complete end-to-end testing');
  console.log('  node test-runner.js help    # Show this help');
}

function runTest(testType) {
  const test = TESTS[testType];
  
  if (!test) {
    console.error(`❌ Unknown test type: ${testType}`);
    console.error('Run "node test-runner.js help" for available options.');
    process.exit(1);
  }
  
  const testFile = path.join(__dirname, test.file);
  
  console.log(`🧪 Starting ${testType} tests...`);
  console.log(`📄 Running: ${test.file}`);
  
  if (test.requiresAuth) {
    console.log('⚠️  This test requires email OTP verification');
    console.log('📧 Make sure you have access to the test email account');
  }
  
  console.log('');
  
  // Spawn the test process
  const child = spawn('node', [testFile], {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  child.on('close', (code) => {
    if (code === 0) {
      console.log(`\n✅ ${testType} tests completed successfully`);
    } else {
      console.log(`\n❌ ${testType} tests failed with code ${code}`);
      process.exit(code);
    }
  });
  
  child.on('error', (error) => {
    console.error(`\n💥 Failed to start test: ${error.message}`);
    process.exit(1);
  });
}

// Main execution
const args = process.argv.slice(2);
const command = args[0];

if (!command || command === 'help' || command === '--help' || command === '-h') {
  showHelp();
  process.exit(0);
}

runTest(command);
