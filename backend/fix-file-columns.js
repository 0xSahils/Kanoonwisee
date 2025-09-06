const sequelize = require('./src/config/database');

async function runMigration() {
  try {
    console.log('🔄 Running manual migration...');
    
    // Change column types to VARCHAR with sufficient length
    await sequelize.query('ALTER TABLE "LawyerProfiles" ALTER COLUMN "photo" TYPE VARCHAR(500)');
    console.log('✅ Photo column updated');
    
    await sequelize.query('ALTER TABLE "LawyerProfiles" ALTER COLUMN "cv" TYPE VARCHAR(500)');
    console.log('✅ CV column updated');
    
    await sequelize.query('ALTER TABLE "LawyerProfiles" ALTER COLUMN "bar_registration_file" TYPE VARCHAR(500)');
    console.log('✅ Bar registration file column updated');
    
    // Clear any existing data to avoid conflicts
    await sequelize.query('UPDATE "LawyerProfiles" SET photo = NULL, cv = NULL, bar_registration_file = NULL');
    console.log('✅ Cleared existing file data');
    
    console.log('🎉 Migration completed successfully!');
    process.exit(0);
  } catch(error) { 
    console.error('❌ Migration failed:', error.message); 
    process.exit(1); 
  }
}

runMigration();
