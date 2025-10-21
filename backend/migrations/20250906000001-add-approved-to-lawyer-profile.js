'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if column already exists
    const tableDescription = await queryInterface.describeTable('LawyerProfiles');
    if (!tableDescription.approved) {
      await queryInterface.addColumn('LawyerProfiles', 'approved', {
        type: Sequelize.ENUM('pending', 'approved', 'canceled'),
        allowNull: false,
        defaultValue: 'pending',
      });
    }
  },
  down: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable('LawyerProfiles');
    if (tableDescription.approved) {
      await queryInterface.removeColumn('LawyerProfiles', 'approved');
    }
  }
};
