#!/usr/bin/env node

/**
 * Check Current Packages in Database
 */

const sequelize = require('./src/config/database');
const { Package } = require('./src/models');

async function checkPackages() {
  try {
    console.log('🔍 Checking current packages in database...\n');

    const packages = await Package.findAll({
      attributes: ['id', 'name', 'price', 'is_active'],
      order: [['created_at', 'ASC']]
    });

    console.log(`📊 Total packages found: ${packages.length}\n`);

    if (packages.length === 0) {
      console.log('❌ No packages found in database!');
      return;
    }

    console.log('📦 Current packages:');
    console.log('─'.repeat(80));

    packages.forEach((pkg, index) => {
      const status = pkg.is_active ? '✅' : '❌';
      console.log(`${(index + 1).toString().padStart(2)}. ${status} ${pkg.id}`);
      console.log(`    ${pkg.name}`);
      console.log(`    Price: ₹${pkg.price}`);
      console.log('');
    });

    // Check for business packages specifically
    const businessPackages = packages.filter(pkg => pkg.id.startsWith('b5f1c3e0'));
    console.log(`🏢 Business service packages: ${businessPackages.length}`);

    // Check for sample packages
    const samplePackages = packages.filter(pkg => pkg.id.startsWith('b4f1c3e0'));
    console.log(`📝 Sample packages: ${samplePackages.length}`);

  } catch (error) {
    console.error('❌ Failed to check packages:', error);
    process.exit(1);
  }
}

checkPackages();