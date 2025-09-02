#!/usr/bin/env node

/**
 * Production database fix script
 * Runs the missing migrations to add columns to LawyerProfiles table
 */

// Load environment variables
require("dotenv").config();

const sequelize = require("./src/config/database");

async function fixProductionDatabase() {
  try {
    console.log("🔗 Connecting to production database...");
    
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
    
    console.log("🔍 Checking LawyerProfiles table structure...");
    
    // Check if the required columns exist
    const tableInfo = await sequelize.getQueryInterface().describeTable('LawyerProfiles');
    const requiredColumns = ['photo', 'cv', 'bar_registration_file', 'state', 'secondary_specialization'];
    const missingColumns = requiredColumns.filter(col => !tableInfo[col]);
    
    if (missingColumns.length === 0) {
      console.log("✅ All required columns already exist in LawyerProfiles table.");
      return;
    }
    
    console.log("📝 Missing columns found:", missingColumns);
    console.log("🚀 Adding missing columns...");
    
    // Add missing columns one by one
    const queryInterface = sequelize.getQueryInterface();
    
    if (missingColumns.includes('photo')) {
      await queryInterface.addColumn('LawyerProfiles', 'photo', {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
        comment: 'URL or path to lawyer profile photo'
      });
      console.log("✅ Added 'photo' column");
    }
    
    if (missingColumns.includes('cv')) {
      await queryInterface.addColumn('LawyerProfiles', 'cv', {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
        comment: 'URL or path to lawyer CV document'
      });
      console.log("✅ Added 'cv' column");
    }
    
    if (missingColumns.includes('state')) {
      await queryInterface.addColumn('LawyerProfiles', 'state', {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
        comment: 'State where the lawyer practices'
      });
      console.log("✅ Added 'state' column");
    }
    
    if (missingColumns.includes('secondary_specialization')) {
      await queryInterface.addColumn('LawyerProfiles', 'secondary_specialization', {
        type: sequelize.Sequelize.ARRAY(sequelize.Sequelize.STRING),
        allowNull: true,
        comment: 'Additional areas of legal expertise'
      });
      console.log("✅ Added 'secondary_specialization' column");
    }
    
    if (missingColumns.includes('bar_registration_file')) {
      await queryInterface.addColumn('LawyerProfiles', 'bar_registration_file', {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
        comment: 'URL or path to bar registration document'
      });
      console.log("✅ Added 'bar_registration_file' column");
    }
    
    console.log("🎉 Database fix completed successfully!");
    
    // Verify the fix worked
    console.log("🔍 Verifying fix...");
    const updatedTableInfo = await sequelize.getQueryInterface().describeTable('LawyerProfiles');
    const stillMissing = requiredColumns.filter(col => !updatedTableInfo[col]);
    
    if (stillMissing.length === 0) {
      console.log("✅ All columns successfully added. The searchLawyers error should now be fixed.");
    } else {
      console.error("❌ Some columns are still missing:", stillMissing);
    }
    
  } catch (error) {
    console.error("❌ Database fix failed:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// Only run if this script is executed directly
if (require.main === module) {
  fixProductionDatabase();
}

module.exports = { fixProductionDatabase };
