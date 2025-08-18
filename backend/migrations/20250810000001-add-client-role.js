'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add client role to the enum
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_Users_role" ADD VALUE 'client';
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Note: PostgreSQL doesn't support removing enum values easily
    // This would require recreating the enum type
    console.log('Cannot easily remove enum value in PostgreSQL');
  }
};
