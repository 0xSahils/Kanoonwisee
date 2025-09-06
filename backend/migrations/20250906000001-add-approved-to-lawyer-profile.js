'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('LawyerProfiles', 'approved', {
      type: Sequelize.ENUM('pending', 'approved', 'canceled'),
      allowNull: false,
      defaultValue: 'pending',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('LawyerProfiles', 'approved');
  }
};
