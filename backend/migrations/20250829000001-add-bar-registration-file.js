'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('LawyerProfiles', 'bar_registration_file', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'URL or path to bar registration document'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('LawyerProfiles', 'bar_registration_file');
  }
};
