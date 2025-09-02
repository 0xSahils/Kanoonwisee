'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if 'client' enum value already exists before adding it
    const [results] = await queryInterface.sequelize.query(`
      SELECT enumlabel FROM pg_enum 
      WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_Users_role') 
      AND enumlabel = 'client'
    `);
    
    if (results.length === 0) {
      // Add client role to the enum only if it doesn't exist
      await queryInterface.sequelize.query(`
        ALTER TYPE "enum_Users_role" ADD VALUE 'client';
      `);
      console.log('Added client role to enum');
    } else {
      console.log('Client role already exists in enum');
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Note: PostgreSQL doesn't support removing enum values easily
    // This would require recreating the enum type
    console.log('Cannot easily remove enum value in PostgreSQL');
  }
};
