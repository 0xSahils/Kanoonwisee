'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Check if UserSessions table already exists
      const tables = await queryInterface.showAllTables();
      const userSessionsExists = tables.includes('UserSessions');
      
      if (!userSessionsExists) {
        console.log('Creating UserSessions table...');
        // Create UserSessions table for connect-session-sequelize
        await queryInterface.createTable('UserSessions', {
          sid: {
            type: Sequelize.STRING,
            primaryKey: true,
          },
          expires: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          data: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
          },
        });
        
        // Add index on expires for efficient cleanup
        await queryInterface.addIndex('UserSessions', ['expires']);
        console.log('✅ UserSessions table created successfully');
      } else {
        console.log('✅ UserSessions table already exists');
        
        // Check if the table has the correct structure
        const tableInfo = await queryInterface.describeTable('UserSessions');
        
        // Add missing columns if needed
        if (!tableInfo.expires) {
          console.log('Adding missing expires column...');
          await queryInterface.addColumn('UserSessions', 'expires', {
            type: Sequelize.DATE,
            allowNull: true,
          });
        }
        
        if (!tableInfo.data) {
          console.log('Adding missing data column...');
          await queryInterface.addColumn('UserSessions', 'data', {
            type: Sequelize.TEXT,
            allowNull: true,
          });
        }
        
        // Try to add the index if it doesn't exist
        try {
          const indexes = await queryInterface.showIndex('UserSessions');
          const expiresIndexExists = indexes.some(index => 
            index.fields.some(field => field.attribute === 'expires')
          );
          
          if (!expiresIndexExists) {
            console.log('Adding expires index...');
            await queryInterface.addIndex('UserSessions', ['expires']);
          }
        } catch (error) {
          console.log('⚠️ Could not add expires index:', error.message);
        }
      }
    } catch (error) {
      console.error('⚠️ Sessions table migration error:', error.message);
      // Don't fail the migration for this
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserSessions');
  }
};
