'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if session_id column already exists
    const tableDescription = await queryInterface.describeTable('UserSessions');
    
    if (!tableDescription.session_id) {
      // First add the column as nullable
      await queryInterface.addColumn('UserSessions', 'session_id', {
        type: Sequelize.UUID,
        allowNull: true,
        comment: 'Unique session identifier'
      });

      // Generate UUIDs for existing records
      await queryInterface.sequelize.query(`
        UPDATE "UserSessions" 
        SET session_id = gen_random_uuid() 
        WHERE session_id IS NULL
      `);

      // Now make it non-nullable
      await queryInterface.changeColumn('UserSessions', 'session_id', {
        type: Sequelize.UUID,
        allowNull: false,
        comment: 'Unique session identifier'
      });

      // Add unique constraint
      await queryInterface.addConstraint('UserSessions', {
        fields: ['session_id'],
        type: 'unique',
        name: 'unique_session_id'
      });

      // Add index for session_id
      await queryInterface.addIndex('UserSessions', ['session_id']);
      
      console.log('Added session_id column to UserSessions');
    } else {
      console.log('session_id column already exists in UserSessions');
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('UserSessions', ['session_id']);
    await queryInterface.removeConstraint('UserSessions', 'unique_session_id');
    await queryInterface.removeColumn('UserSessions', 'session_id');
  }
};
