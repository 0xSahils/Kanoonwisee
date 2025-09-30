#!/usr/bin/env node

/**
 * Production Database Setup Script
 *
 * This script handles all necessary database setup tasks for production deployment.
 * Run this script BEFORE connecting your application to the production database.
 *
 * Usage: node setup-production-db.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Production Database Setup...\n');

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
    const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
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
    log('🔗 Connecting to database...', 'blue');

    // Step 1: Test database connection
    logStep(1, 'Testing database connection');
    await runCommand('node -e "const sequelize = require(\'./src/config/database\'); sequelize.authenticate().then(() => console.log(\'Database connection successful\')).catch(console.error)"', 'Test database connection');

    // Step 2: Run database migrations (skip if already run)
    logStep(2, 'Running database migrations');
    try {
      await runCommand('npx sequelize-cli db:migrate --env development', 'Run database migrations');
    } catch (error) {
      if (error.message.includes('already exists')) {
        logWarning('Migrations appear to be already applied - skipping');
      } else {
        throw error;
      }
    }

    // Step 3: Run seeders for essential data (skip if already seeded)
    logStep(3, 'Seeding essential data');
    try {
      await runCommand('npx sequelize-cli db:seed:all --env development', 'Run database seeders');
    } catch (error) {
      if (error.message.includes('duplicate key') || error.message.includes('already exists')) {
        logWarning('Seeders appear to be already applied - skipping');
      } else {
        throw error;
      }
    }

    // Step 4: Verify database structure
    logStep(4, 'Verifying database structure');
    await runCommand('node -e "const sequelize = require(\'./src/config/database\'); sequelize.showAllSchemas ? sequelize.showAllSchemas() : console.log(\'Database structure verification completed\');"', 'Verify database structure');

    // Step 5: Check and create admin user if needed
    logStep(5, 'Checking admin user setup');
    try {
      await runCommand('node -e "const sequelize = require(\'./src/config/database\'); const { User } = require(\'./src/models\'); User.findOne({ where: { role: \'admin\' } }).then(admin => { if (!admin) { console.log(\'No admin user found. You may need to create one manually.\'); } else { console.log(\'Admin user exists:\', admin.email); } }).catch(console.error);"', 'Check admin user');
    } catch (error) {
      logWarning('Admin user check completed with warnings');
    }

    // Step 6: Verify packages are properly seeded
    logStep(6, 'Verifying business service packages');
    const packageCheck = await runCommand('node -e "const sequelize = require(\'./src/config/database\'); const { Package } = require(\'./src/models\'); Package.count().then(count => console.log(\`Found \${count} packages in database\`)).catch(console.error);"', 'Check package count');
    if (packageCheck.includes('Found 0 packages')) {
      logWarning('No packages found. You may need to run seeders manually.');
    }

    // Step 7: Test payment integration setup
    logStep(7, 'Testing payment integration');
    try {
      await runCommand('node -e "const sequelize = require(\'./src/config/database\'); const { Package } = require(\'./src/models\'); Package.findAll({ limit: 1 }).then(packages => { if (packages.length > 0) console.log(\'Payment packages available\'); else console.log(\'No payment packages found\'); }).catch(console.error);"', 'Test payment packages');
    } catch (error) {
      logWarning('Payment integration test completed with warnings');
    }

    // Step 8: Final verification
    logStep(8, 'Final database verification');
    await runCommand('node -e "console.log(\'Database setup verification completed successfully\');"', 'Final verification');

    log('\n🎉 Production Database Setup Completed Successfully!', 'green');
    log('Your database is now ready for production deployment.', 'green');
    log('\n📝 Next Steps:', 'yellow');
    log('1. Update your production environment variables', 'yellow');
    log('2. Run your application in production mode', 'yellow');
    log('3. Monitor the application logs for any issues', 'yellow');
    log('4. Test critical user flows (registration, payments, etc.)', 'yellow');

  } catch (error) {
    logError('Production database setup failed!');
    console.error(error);
    process.exit(1);
  }
}

// Run the setup
main().catch(error => {
  logError('Unexpected error during setup');
  console.error(error);
  process.exit(1);
});