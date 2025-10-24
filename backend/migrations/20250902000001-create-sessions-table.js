'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Check if Sessions table already exists (for express-session, NOT UserSessions)
      const tables = await queryInterface.showAllTables();
      const sessionsExists = tables.includes('Sessions');
      
      if (!sessionsExists) {
        console.log('Creating Sessions table for express-session...');
        // Create Sessions table for connect-session-sequelize (CSRF/session management)
        // This is separate from UserSessions which tracks JWT refresh tokens
        await queryInterface.createTable('Sessions', {
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
        await queryInterface.addIndex('Sessions', ['expires']);
        console.log('✅ Sessions table created successfully');
      } else {
        console.log('✅ Sessions table already exists');
        
        // Check if the table has the correct structure
        const tableInfo = await queryInterface.describeTable('Sessions');
        
        // Add missing columns if needed
        if (!tableInfo.expires) {
          console.log('Adding missing expires column...');
          await queryInterface.addColumn('Sessions', 'expires', {
            type: Sequelize.DATE,
            allowNull: true,
          });
        }
        
        if (!tableInfo.data) {
          console.log('Adding missing data column...');
          await queryInterface.addColumn('Sessions', 'data', {
            type: Sequelize.TEXT,
            allowNull: true,
          });
        }
        
        // Try to add the index if it doesn't exist
        try {
          const indexes = await queryInterface.showIndex('Sessions');
          const expiresIndexExists = indexes.some(index => 
            index.fields.some(field => field.attribute === 'expires')
          );
          
          if (!expiresIndexExists) {
            console.log('Adding expires index...');
            await queryInterface.addIndex('Sessions', ['expires']);
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
    await queryInterface.dropTable('Sessions');
  }
};
