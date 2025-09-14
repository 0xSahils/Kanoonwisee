'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Check if columns are already JSON type
      const tableInfo = await queryInterface.describeTable('LawyerProfiles');
      
      // Handle photo column
      if (tableInfo.photo && tableInfo.photo.type !== 'JSON') {
        console.log('Converting photo column to JSON...');
        
        // First, create a temporary column
        await queryInterface.addColumn('LawyerProfiles', 'photo_temp', {
          type: Sequelize.JSON,
          allowNull: true,
        }, { transaction });
        
        // Convert existing string data to JSON format
        await queryInterface.sequelize.query(`
          UPDATE "LawyerProfiles" 
          SET photo_temp = CASE 
            WHEN photo IS NULL OR photo = '' THEN NULL
            ELSE json_build_object('key', photo, 'legacyUrl', photo)
          END
        `, { transaction });
        
        // Drop old column and rename temp column
        await queryInterface.removeColumn('LawyerProfiles', 'photo', { transaction });
        await queryInterface.renameColumn('LawyerProfiles', 'photo_temp', 'photo', { transaction });
      } else {
        console.log('✓ Photo column already JSON type or correct');
      }

      // Handle cv column
      if (tableInfo.cv && tableInfo.cv.type !== 'JSON') {
        console.log('Converting cv column to JSON...');
        
        await queryInterface.addColumn('LawyerProfiles', 'cv_temp', {
          type: Sequelize.JSON,
          allowNull: true,
        }, { transaction });
        
        await queryInterface.sequelize.query(`
          UPDATE "LawyerProfiles" 
          SET cv_temp = CASE 
            WHEN cv IS NULL OR cv = '' THEN NULL
            ELSE json_build_object('key', cv, 'legacyUrl', cv)
          END
        `, { transaction });
        
        await queryInterface.removeColumn('LawyerProfiles', 'cv', { transaction });
        await queryInterface.renameColumn('LawyerProfiles', 'cv_temp', 'cv', { transaction });
      } else {
        console.log('✓ CV column already JSON type or correct');
      }

      // Handle bar_registration_file column
      if (tableInfo.bar_registration_file && tableInfo.bar_registration_file.type !== 'JSON') {
        console.log('Converting bar_registration_file column to JSON...');
        
        await queryInterface.addColumn('LawyerProfiles', 'bar_registration_file_temp', {
          type: Sequelize.JSON,
          allowNull: true,
        }, { transaction });
        
        await queryInterface.sequelize.query(`
          UPDATE "LawyerProfiles" 
          SET bar_registration_file_temp = CASE 
            WHEN bar_registration_file IS NULL OR bar_registration_file = '' THEN NULL
            ELSE json_build_object('key', bar_registration_file, 'legacyUrl', bar_registration_file)
          END
        `, { transaction });
        
        await queryInterface.removeColumn('LawyerProfiles', 'bar_registration_file', { transaction });
        await queryInterface.renameColumn('LawyerProfiles', 'bar_registration_file_temp', 'bar_registration_file', { transaction });
      } else {
        console.log('✓ Bar registration file column already JSON type or correct');
      }
      
      await transaction.commit();
      console.log('✅ Successfully converted file columns to JSON');
      
    } catch (error) {
      await transaction.rollback();
      console.error('❌ Migration failed:', error.message);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Revert photo column to STRING type
      await queryInterface.addColumn('LawyerProfiles', 'photo_temp', {
        type: Sequelize.STRING,
        allowNull: true,
      }, { transaction });
      
      await queryInterface.sequelize.query(`
        UPDATE "LawyerProfiles" 
        SET photo_temp = CASE 
          WHEN photo IS NULL THEN NULL
          WHEN photo->>'legacyUrl' IS NOT NULL THEN photo->>'legacyUrl'
          WHEN photo->>'key' IS NOT NULL THEN photo->>'key'
          ELSE NULL
        END
      `, { transaction });
      
      await queryInterface.removeColumn('LawyerProfiles', 'photo', { transaction });
      await queryInterface.renameColumn('LawyerProfiles', 'photo_temp', 'photo', { transaction });

      // Similar for cv and bar_registration_file...
      // (Adding similar logic for other columns)
      
      await transaction.commit();
      
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
