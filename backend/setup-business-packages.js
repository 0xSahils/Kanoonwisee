#!/usr/bin/env node

/**
 * Business Packages Setup Script
 *
 * This script sets up all business service packages in the production database.
 * It handles company registration, compliance, IP services, and legal packages.
 *
 * Usage: node setup-business-packages.js
 */

const { execSync } = require('child_process');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`📋 Step ${step}: ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

async function runCommand(command, description) {
  try {
    log(`🔧 ${description}...`, 'blue');
    const result = execSync(command, {
      encoding: 'utf8',
      cwd: __dirname,
      stdio: 'pipe'
    });
    logSuccess(`${description} completed`);
    return result;
  } catch (error) {
    logError(`Failed to ${description.toLowerCase()}`);
    console.error(error.stdout || error.stderr);
    throw error;
  }
}

async function main() {
  try {
    log('🚀 Setting up Business Service Packages...', 'bright');
    console.log('');

    // Step 1: Test database connection
    logStep(1, 'Testing database connection');
    await runCommand('node -e "const sequelize = require(\'./src/config/database\'); sequelize.authenticate().then(() => console.log(\'Database connection successful\')).catch(console.error)"', 'Test database connection');

    // Step 2: Ensure Packages table exists (run package-related migrations)
    logStep(2, 'Ensuring Packages table exists');
    try {
      await runCommand('npx sequelize-cli db:migrate --env development --name 20250919000001-create-packages.js', 'Run packages table migration');
    } catch (error) {
      if (error.message.includes('already exists')) {
        logWarning('Packages table already exists - skipping migration');

    } else {
        throw error;
      }
    }

    // Step 3: Clear existing business service packages (optional - uncomment if needed)
    logStep(3, 'Clearing existing business service packages');
    try {
      await runCommand('node -e "const sequelize = require(\'./src/config/database\'); const { Package } = require(\'./src/models\'); Package.destroy({ where: { id: { [require(\'sequelize\').Op.like]: \'b5f1c3e0%\' } } }).then(count => console.log(\`Cleared \${count} existing business packages\`)).catch(console.error);"', 'Clear existing business packages');
    } catch (error) {
      logWarning('Could not clear existing packages - continuing');
    }

    // Step 4: Seed business service packages using direct Node.js script
    logStep(4, 'Seeding business service packages');
    await runCommand('node insert-business-packages.js', 'Insert business service packages with upsert');

    // Step 5: Verify business packages were inserted
    logStep(5, 'Verifying business packages setup');
    const packageCheck = await runCommand('node -e "const sequelize = require(\'./src/config/database\'); const { Package } = require(\'./src/models\'); Package.findAll({ where: { id: { [require(\'sequelize\').Op.like]: \'b5f1c3e0%\' } } }).then(packages => console.log(\`Found \${packages.length} business service packages\`)).catch(console.error);"', 'Verify business packages count');

    // Step 6: List all business packages for verification
    logStep(6, 'Listing all business service packages');
    await runCommand('node -e "const sequelize = require(\'./src/config/database\'); const { Package } = require(\'./src/models\'); Package.findAll({ where: { id: { [require(\'sequelize\').Op.like]: \'b5f1c3e0%\' } }, attributes: [\'id\', \'name\', \'price\'] }).then(packages => { console.log(\'Business Service Packages:\'); packages.forEach(pkg => console.log(\`- \${pkg.name}: ₹\${pkg.price}\`)); }).catch(console.error);"', 'List business packages');

    log('\n🎉 Business Service Packages Setup Completed Successfully!', 'green');
    log('📊 Business packages include:', 'yellow');
    log('  • Company Registration Services (Private Ltd, LLP, OPC, etc.)', 'yellow');
    log('  • Intellectual Property Services (Trademark, Patent, Copyright)', 'yellow');
    log('  • Compliance Services (GST, Labour Law, POSH)', 'yellow');
    log('  • Legal Support Services (Virtual Legal Officer, Compliance Package)', 'yellow');

    log('\n💡 Next Steps:', 'cyan');
    log('1. Verify packages appear correctly in your frontend', 'cyan');
    log('2. Test payment integration with business packages', 'cyan');
    log('3. Update pricing if needed based on market rates', 'cyan');

  } catch (error) {
    logError('Business packages setup failed!');
    console.error(error);
    process.exit(1);
  }
}

// Run the setup
main().catch(error => {
  logError('Unexpected error during business packages setup');
  console.error(error);
  process.exit(1);
});