const sequelize = require('./src/config/database');
const { Package } = require('./src/models');

// User's required packages with expected pricing
const requiredPackages = [
  // 1. Private Limited Company Registration
  { name: 'Starter Plan', expectedPrice: 1199, category: 'Private Limited Company' },
  { name: 'Pro Plan', expectedPrice: 3999, category: 'Private Limited Company' },
  
  // 2. OPC Registration
  { name: 'OPC Premium Plan', expectedPrice: 29999, category: 'OPC Registration' },
  
  // 3. Sole Proprietorship
  { name: 'Sole Proprietorship Premium Plan', expectedPrice: 9912, category: 'Sole Proprietorship' },
  
  // 4. Partnership Firm Registration
  { name: 'Partnership Starter Plan', expectedPrice: 2999, category: 'Partnership Firm' },
  { name: 'Partnership Premium Plan', expectedPrice: 5999, category: 'Partnership Firm' },
  
  // 5. Trademark Services
  { name: 'Brand Starter', expectedPrice: 7999, category: 'Trademark Registration' },
  { name: 'Business Shield', expectedPrice: 12999, category: 'Trademark Registration' },
  { name: 'Enterprise Guard', expectedPrice: 24999, category: 'Trademark Registration' },
  
  // 6. Patent Services
  { name: 'Provisional Patent Filing', expectedPrice: 19999, category: 'Patent Services' },
  { name: 'Complete Patent Prosecution', expectedPrice: 74999, category: 'Patent Services' },
  
  // 7. Copyright Services
  { name: 'Creator Basic', expectedPrice: 4999, category: 'Copyright Registration' },
  { name: 'Professional Shield', expectedPrice: 9999, category: 'Copyright Registration' },
  { name: 'Enterprise Vault', expectedPrice: 19999, category: 'Copyright Registration' },
  
  // 8. Design Registration
  { name: 'Design Basic', expectedPrice: 9999, category: 'Design Registration' },
  { name: 'Design Professional', expectedPrice: 19999, category: 'Design Registration' },
  { name: 'Design Enterprise', expectedPrice: 34999, category: 'Design Registration' },
  
  // 9. Virtual Legal Officer
  { name: 'VLO Advisory Plan', expectedPrice: 14999, category: 'Virtual Legal Officer' },
  { name: 'VLO Growth Plan', expectedPrice: 39999, category: 'Virtual Legal Officer' },
  
  // 10. Labour Law Compliance
  { name: 'Starter Team', expectedPrice: 3499, category: 'Labour Law Compliance' },
  { name: 'Growth Team', expectedPrice: 6999, category: 'Labour Law Compliance' },
  
  // 11. GST Compliance
  { name: 'GST Registration', expectedPrice: 2499, category: 'GST Compliance' },
  { name: 'GST Filing - Standard', expectedPrice: 19999, category: 'GST Compliance' },
  { name: 'GST Filing - Pro', expectedPrice: 24999, category: 'GST Compliance' },
  
  // 12. Accounting Tax Services
  { name: 'Startup Plan', expectedPrice: 4999, category: 'Accounting Tax Services' },
  { name: 'Growth Plan', expectedPrice: 9999, category: 'Accounting Tax Services' },
  
  // 13. LLP Annual Compliance
  { name: 'LLP Filing Essentials', expectedPrice: 9999, category: 'LLP Annual Compliance' },
  { name: 'LLP Compliance Retainer', expectedPrice: 19999, category: 'LLP Annual Compliance' },
  
  // 14. Startup Legal Kit
  { name: 'Essential Kit', expectedPrice: 24999, category: 'Startup Legal Kit' },
  { name: 'Growth Kit', expectedPrice: 59999, category: 'Startup Legal Kit' },
  { name: 'Scale-Up Kit', expectedPrice: 99999, category: 'Startup Legal Kit' },
];

async function verifyAllRequiredPackages() {
  try {
    console.log('🔗 Connecting to database...');
    await sequelize.authenticate();
    
    console.log('🔍 Verifying all required packages and pricing...\n');
    
    let foundCount = 0;
    let correctPriceCount = 0;
    let missingCount = 0;
    let wrongPriceCount = 0;
    
    const packagesByCategory = {};
    
    for (const required of requiredPackages) {
      try {
        const existingPackage = await Package.findOne({
          where: { name: required.name }
        });
        
        if (!packagesByCategory[required.category]) {
          packagesByCategory[required.category] = [];
        }
        
        if (existingPackage) {
          foundCount++;
          const actualPrice = parseFloat(existingPackage.price);
          
          if (actualPrice === required.expectedPrice) {
            correctPriceCount++;
            console.log(`✅ ${required.category}: ${required.name} - ₹${actualPrice.toLocaleString('en-IN')}`);
            packagesByCategory[required.category].push(`✅ ${required.name} - ₹${actualPrice.toLocaleString('en-IN')}`);
          } else {
            wrongPriceCount++;
            console.log(`⚠️  ${required.category}: ${required.name} - ₹${actualPrice.toLocaleString('en-IN')} (Expected: ₹${required.expectedPrice.toLocaleString('en-IN')})`);
            packagesByCategory[required.category].push(`⚠️ ${required.name} - ₹${actualPrice.toLocaleString('en-IN')} (Expected: ₹${required.expectedPrice.toLocaleString('en-IN')})`);
          }
        } else {
          missingCount++;
          console.log(`❌ ${required.category}: ${required.name} - MISSING`);
          packagesByCategory[required.category].push(`❌ ${required.name} - MISSING`);
        }
      } catch (error) {
        console.log(`❌ Error checking ${required.name}: ${error.message}`);
        missingCount++;
      }
    }
    
    console.log('\n📊 Summary by Category:');
    console.log('═'.repeat(50));
    
    Object.entries(packagesByCategory).forEach(([category, packages]) => {
      console.log(`\n📦 ${category}:`);
      packages.forEach(pkg => console.log(`   ${pkg}`));
    });
    
    console.log('\n📈 Overall Summary:');
    console.log('═'.repeat(50));
    console.log(`   Total required packages: ${requiredPackages.length}`);
    console.log(`   Found packages: ${foundCount}`);
    console.log(`   Correct pricing: ${correctPriceCount}`);
    console.log(`   Wrong pricing: ${wrongPriceCount}`);
    console.log(`   Missing packages: ${missingCount}`);
    
    if (foundCount === requiredPackages.length && correctPriceCount === requiredPackages.length) {
      console.log('\n🎉 All required packages are present with correct pricing!');
      console.log('✨ The "Service not found" issue should now be resolved.');
    } else if (foundCount === requiredPackages.length && wrongPriceCount > 0) {
      console.log('\n⚠️  All packages exist but some have incorrect pricing.');
    } else {
      console.log('\n❌ Some packages are missing or have incorrect pricing.');
      console.log('💡 Please run the fix-package-pricing.js script to resolve issues.');
    }
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the verification
verifyAllRequiredPackages()
  .then(() => {
    console.log('\n✅ Package verification completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });