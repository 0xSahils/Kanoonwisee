'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Sessions table for connect-session-sequelize
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sessions');
  }
};
