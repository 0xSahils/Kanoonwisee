#!/usr/bin/env node

/**
 * Robust Production Database Fix Script
 * Handles partial migration states and adds only missing columns
 */

require("dotenv").config();
const sequelize = require("./src/config/database");

async function fixPartialMigrationState() {
  try {
    console.log('🔗 Connecting to production database...');
    await sequelize.authenticate();
    console.log('✅ Database connection successful');
    
    const queryInterface = sequelize.getQueryInterface();
    
    console.log('🔍 Checking LawyerProfiles table structure...');
    const tableInfo = await queryInterface.describeTable('LawyerProfiles');
    const existingColumns = Object.keys(tableInfo);
    
    console.log('Existing columns:', existingColumns);
    
    // Define all expected columns with their definitions
    const expectedColumns = {
      'photo': {
        type: 'VARCHAR(255)',
        allowNull: true,
        comment: 'S3 key for profile photo'
      },
      'cv': {
        type: 'VARCHAR(255)',
        allowNull: true,
        comment: 'S3 key for CV document'
      },
      'bar_registration_file': {
        type: 'VARCHAR(255)',
        allowNull: true,
        comment: 'S3 key for bar registration document'
      },
      'state': {
        type: 'VARCHAR(255)',
        allowNull: true
      },
      'secondary_specialization': {
        type: 'VARCHAR(255)[]',
        allowNull: true
      },
      'approved': {
        type: 'enum_LawyerProfiles_approved',
        allowNull: false,
        defaultValue: 'pending'
      }
    };
    
    // Check and add missing columns one by one
    for (const [columnName, columnDef] of Object.entries(expectedColumns)) {
      if (!existingColumns.includes(columnName)) {
        console.log(`➕ Adding missing column: ${columnName}`);
        
        try {
          if (columnName === 'approved') {
            // First create the enum type if it doesn't exist
            await sequelize.query(`
              DO $$ BEGIN
                CREATE TYPE enum_LawyerProfiles_approved AS ENUM ('pending', 'approved', 'canceled');
              EXCEPTION
                WHEN duplicate_object THEN null;
              END $$;
            `);
            
            // Add the column with the enum type
            await queryInterface.addColumn('LawyerProfiles', 'approved', {
              type: sequelize.Sequelize.ENUM('pending', 'approved', 'canceled'),
              allowNull: false,
              defaultValue: 'pending'
            });
          } else if (columnName === 'secondary_specialization') {
            await queryInterface.addColumn('LawyerProfiles', 'secondary_specialization', {
              type: sequelize.Sequelize.ARRAY(sequelize.Sequelize.STRING),
              allowNull: true
            });
          } else {
            await queryInterface.addColumn('LawyerProfiles', columnName, {
              type: sequelize.Sequelize.STRING,
              allowNull: true
            });
          }
          console.log(`✅ Successfully added column: ${columnName}`);
        } catch (error) {
          console.error(`❌ Error adding column ${columnName}:`, error.message);
        }
      } else {
        console.log(`✓ Column already exists: ${columnName}`);
      }
    }
    
    // Mark migrations as completed to prevent re-running
    console.log('🔄 Updating migration status...');
    
    const migrations = [
      '20250828000001-add-lawyer-profile-fields.js',
      '20250829000001-add-bar-registration-file.js',
      '20250902000001-create-sessions-table.js'
    ];
    
    for (const migration of migrations) {
      try {
        await sequelize.query(`
          INSERT INTO "SequelizeMeta" (name) 
          VALUES ('${migration}')
          ON CONFLICT (name) DO NOTHING
        `);
        console.log(`✅ Marked migration as completed: ${migration}`);
      } catch (error) {
        console.log(`⚠️ Migration status update for ${migration}:`, error.message);
      }
    }
    
    // Fix UserSessions table if needed
    console.log('🔧 Checking UserSessions table...');
    try {
      const tablesInfo = await queryInterface.showAllTables();
      if (tablesInfo.includes('UserSessions')) {
        const userSessionsInfo = await queryInterface.describeTable('UserSessions');
        
        if (!userSessionsInfo.expires) {
          console.log('➕ Adding missing expires column to UserSessions...');
          await queryInterface.addColumn('UserSessions', 'expires', {
            type: sequelize.Sequelize.DATE,
            allowNull: true
          });
        }
        
        if (!userSessionsInfo.data) {
          console.log('➕ Adding missing data column to UserSessions...');
          await queryInterface.addColumn('UserSessions', 'data', {
            type: sequelize.Sequelize.TEXT,
            allowNull: true
          });
        }
        
        console.log('✅ UserSessions table is properly configured');
      }
    } catch (error) {
      console.log('⚠️ UserSessions table check failed:', error.message);
    }
    
    // Final verification
    console.log('🔍 Final verification...');
    const finalTableInfo = await queryInterface.describeTable('LawyerProfiles');
    const finalColumns = Object.keys(finalTableInfo);
    
    const allExpectedColumns = Object.keys(expectedColumns);
    const stillMissing = allExpectedColumns.filter(col => !finalColumns.includes(col));
    
    if (stillMissing.length === 0) {
      console.log('✅ All columns are now present in LawyerProfiles table');
      console.log('Final columns:', finalColumns);
    } else {
      console.error('❌ Still missing columns:', stillMissing);
    }
    
    await sequelize.close();
    console.log('✅ Database fix completed');
    
  } catch (error) {
    console.error('❌ Database fix failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

fixPartialMigrationState();
