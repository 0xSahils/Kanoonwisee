#!/usr/bin/env node

/**
 * Production Packages Verification Script
 *
 * This script verifies that all required packages are correctly deployed
 * in the production database with proper pricing and features.
 *
 * Usage: NODE_ENV=production node verify-production-deployment.js
 */

require('dotenv').config();

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

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// Expected packages with their categories and pricing
const expectedPackages = [
  // Private Limited Company Registration
  { name: 'Starter Plan', price: 1199, category: 'Private Limited Company Registration' },
  { name: 'Pro Plan', price: 3999, category: 'Private Limited Company Registration' },
  
  // OPC Registration
  { name: 'OPC Starter Plan', price: 1799, category: 'OPC Registration' },
  { name: 'OPC Premium Plan', price: 29999, category: 'OPC Registration' },
  
  // Sole Proprietorship Registration
  { name: 'Sole Proprietorship Starter Plan', price: 2999, category: 'Sole Proprietorship Registration' },
  { name: 'Sole Proprietorship Premium Plan', price: 9912, category: 'Sole Proprietorship Registration' },
  
  // Partnership Firm Registration
  { name: 'Partnership Starter Plan', price: 2999, category: 'Partnership Firm Registration' },
  { name: 'Partnership Premium Plan', price: 5999, category: 'Partnership Firm Registration' },
  
  // Trademark Registration
  { name: 'Brand Starter', price: 7999, category: 'Trademark Registration' },
  { name: 'Business Shield', price: 12999, category: 'Trademark Registration' },
  { name: 'Enterprise Guard', price: 24999, category: 'Trademark Registration' },
  
  // Patent Services
  { name: 'Provisional Patent Filing', price: 19999, category: 'Patent Services' },
  { name: 'Complete Patent Prosecution', price: 74999, category: 'Patent Services' },
  
  // Copyright Registration
  { name: 'Creator Basic', price: 4999, category: 'Copyright Registration' },
  { name: 'Professional Shield', price: 9999, category: 'Copyright Registration' },
  { name: 'Enterprise Vault', price: 19999, category: 'Copyright Registration' },
  
  // Design Registration
  { name: 'Design Basic', price: 9999, category: 'Design Registration' },
  { name: 'Design Professional', price: 19999, category: 'Design Registration' },
  { name: 'Design Enterprise', price: 34999, category: 'Design Registration' },
  
  // Virtual Legal Officer
  { name: 'VLO Advisory Plan', price: 14999, category: 'Virtual Legal Officer' },
  { name: 'VLO Growth Plan', price: 39999, category: 'Virtual Legal Officer' },
  
  // Labour Law Compliance
  { name: 'Starter Team', price: 3499, category: 'Labour Law Compliance' },
  { name: 'Growth Team', price: 6999, category: 'Labour Law Compliance' },
  
  // GST Compliance
  { name: 'GST Registration', price: 2499, category: 'GST Compliance' },
  { name: 'GST Filing - Standard', price: 19999, category: 'GST Compliance' },
  { name: 'GST Filing - Pro', price: 24999, category: 'GST Compliance' },
  
  // Accounting Tax Services
  { name: 'Startup Plan', price: 4999, category: 'Accounting Tax Services' },
  { name: 'Growth Plan', price: 9999, category: 'Accounting Tax Services' },
  
  // LLP Annual Compliance
  { name: 'LLP Filing Essentials', price: 9999, category: 'LLP Annual Compliance' },
  { name: 'LLP Compliance Retainer', price: 19999, category: 'LLP Annual Compliance' },
  
  // Startup Legal Kit
  { name: 'Essential Kit', price: 24999, category: 'Startup Legal Kit' },
  { name: 'Growth Kit', price: 59999, category: 'Startup Legal Kit' },
  { name: 'Scale-Up Kit', price: 99999, category: 'Startup Legal Kit' }
];

async function verifyProductionDeployment() {
  const env = process.env.NODE_ENV || 'development';

  log(`🔍 Production Deployment Verification`, 'bright');
  log(`Environment: ${env.toUpperCase()}`, 'yellow');
  log(`Expected packages: ${expectedPackages.length}`, 'cyan');
  console.log('');

  if (env !== 'production') {
    logWarning(`This verification is for production environment only`);
    logError(`Current environment: ${env}`);
    log('Please set NODE_ENV=production and try again');
    process.exit(1);
  }

  let sequelize;
  let Package;

  try {
    // Initialize database connection
    logInfo('Connecting to production database...');
    sequelize = require('./src/config/database');
    ({ Package } = require('./src/models'));

    await sequelize.authenticate();
    logSuccess('Connected to production database');

    // Get all packages from database
    const dbPackages = await Package.findAll({
      attributes: ['id', 'name', 'price', 'duration', 'description', 'features', 'is_active']
    });

    log(`\n📦 Found ${dbPackages.length} packages in production database`, 'cyan');

    // Verification statistics
    let foundCount = 0;
    let correctPriceCount = 0;
    let missingCount = 0;
    let wrongPriceCount = 0;
    let inactiveCount = 0;

    const categoryResults = {};

    // Verify each expected package
    for (const expected of expectedPackages) {
      const dbPackage = dbPackages.find(pkg => pkg.name === expected.name);
      
      if (!categoryResults[expected.category]) {
        categoryResults[expected.category] = {
          total: 0,
          found: 0,
          correct: 0,
          issues: []
        };
      }
      categoryResults[expected.category].total++;

      if (dbPackage) {
        foundCount++;
        categoryResults[expected.category].found++;

        if (!dbPackage.is_active) {
          inactiveCount++;
          categoryResults[expected.category].issues.push(`${expected.name} is inactive`);
          log(`⚠️  ${expected.category}: ${expected.name} - INACTIVE`, 'yellow');
          continue;
        }

        const actualPrice = parseFloat(dbPackage.price);
        if (actualPrice === expected.price) {
          correctPriceCount++;
          categoryResults[expected.category].correct++;
          log(`✅ ${expected.category}: ${expected.name} - ₹${actualPrice.toLocaleString('en-IN')}`, 'green');
        } else {
          wrongPriceCount++;
          categoryResults[expected.category].issues.push(`${expected.name} has wrong price: ₹${actualPrice.toLocaleString('en-IN')} (expected: ₹${expected.price.toLocaleString('en-IN')})`);
          log(`⚠️  ${expected.category}: ${expected.name} - ₹${actualPrice.toLocaleString('en-IN')} (expected: ₹${expected.price.toLocaleString('en-IN')})`, 'yellow');
        }
      } else {
        missingCount++;
        categoryResults[expected.category].issues.push(`${expected.name} is missing`);
        log(`❌ ${expected.category}: ${expected.name} - MISSING`, 'red');
      }
    }

    // Category-wise summary
    log('\n📊 Category-wise Verification Results:', 'bright');
    log('═'.repeat(80), 'cyan');

    for (const [category, results] of Object.entries(categoryResults)) {
      const successRate = results.found > 0 ? Math.round((results.correct / results.found) * 100) : 0;
      const statusIcon = results.correct === results.total ? '✅' : results.found === results.total ? '⚠️' : '❌';
      
      log(`\n${statusIcon} ${category}:`, 'cyan');
      log(`   📦 Total expected: ${results.total}`, 'blue');
      log(`   ✅ Found: ${results.found}`, results.found === results.total ? 'green' : 'yellow');
      log(`   💰 Correct pricing: ${results.correct}`, results.correct === results.found ? 'green' : 'yellow');
      log(`   📈 Success rate: ${successRate}%`, successRate === 100 ? 'green' : 'yellow');
      
      if (results.issues.length > 0) {
        log(`   ⚠️  Issues:`, 'red');
        results.issues.forEach(issue => log(`      • ${issue}`, 'red'));
      }
    }

    // Overall summary
    log('\n🎯 Overall Verification Summary:', 'bright');
    log('═'.repeat(50), 'cyan');
    log(`📦 Total expected packages: ${expectedPackages.length}`, 'blue');
    log(`✅ Found packages: ${foundCount}`, foundCount === expectedPackages.length ? 'green' : 'red');
    log(`💰 Correct pricing: ${correctPriceCount}`, correctPriceCount === foundCount ? 'green' : 'yellow');
    log(`❌ Missing packages: ${missingCount}`, missingCount === 0 ? 'green' : 'red');
    log(`⚠️  Wrong pricing: ${wrongPriceCount}`, wrongPriceCount === 0 ? 'green' : 'yellow');
    log(`🚫 Inactive packages: ${inactiveCount}`, inactiveCount === 0 ? 'green' : 'yellow');

    const successRate = foundCount > 0 ? Math.round((correctPriceCount / foundCount) * 100) : 0;
    log(`📈 Overall success rate: ${successRate}%`, successRate === 100 ? 'green' : 'yellow');

    // Final status
    console.log('');
    if (foundCount === expectedPackages.length && correctPriceCount === foundCount && inactiveCount === 0) {
      log('🎉 PRODUCTION DEPLOYMENT VERIFIED SUCCESSFULLY!', 'bright');
      logSuccess('All packages are correctly deployed with proper pricing');
      logSuccess('The platform is ready for production use');
      log('✨ All "Service not found" issues should be resolved', 'green');
    } else if (foundCount === expectedPackages.length) {
      logWarning('All packages exist but some have issues');
      if (wrongPriceCount > 0) {
        log('💡 Some packages have incorrect pricing', 'yellow');
      }
      if (inactiveCount > 0) {
        log('💡 Some packages are inactive', 'yellow');
      }
    } else {
      logError('PRODUCTION DEPLOYMENT HAS ISSUES');
      log('💡 Please review the missing packages and re-run deployment', 'red');
    }

    // Additional checks
    log('\n🔍 Additional Production Checks:', 'bright');
    log('═'.repeat(40), 'cyan');

    // Check for duplicate packages
    const packageNames = dbPackages.map(pkg => pkg.name);
    const duplicateNames = packageNames.filter((name, index) => packageNames.indexOf(name) !== index);
    if (duplicateNames.length > 0) {
      logWarning(`Found duplicate package names: ${duplicateNames.join(', ')}`);
    } else {
      logSuccess('No duplicate package names found');
    }

    // Check for packages with invalid pricing
    const invalidPrices = dbPackages.filter(pkg => !pkg.price || pkg.price <= 0);
    if (invalidPrices.length > 0) {
      logWarning(`Found ${invalidPrices.length} packages with invalid pricing`);
    } else {
      logSuccess('All packages have valid pricing');
    }

    // Check for packages without features
    const noFeatures = dbPackages.filter(pkg => !pkg.features || pkg.features === '[]');
    if (noFeatures.length > 0) {
      logWarning(`Found ${noFeatures.length} packages without features`);
    } else {
      logSuccess('All packages have features defined');
    }

  } catch (error) {
    logError('Verification failed');
    console.error(error);
    process.exit(1);
  } finally {
    if (sequelize) {
      await sequelize.close();
      logInfo('Database connection closed');
    }
  }
}

// Script execution
if (require.main === module) {
  verifyProductionDeployment()
    .then(() => {
      log('\n✅ Verification completed', 'green');
      process.exit(0);
    })
    .catch((error) => {
      logError('Verification failed');
      console.error(error);
      process.exit(1);
    });
}

module.exports = { verifyProductionDeployment };