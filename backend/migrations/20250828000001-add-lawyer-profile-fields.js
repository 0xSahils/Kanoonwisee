'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('LawyerProfiles', 'photo', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'URL or path to lawyer profile photo'
    });

    await queryInterface.addColumn('LawyerProfiles', 'cv', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'URL or path to lawyer CV document'
    });

    await queryInterface.addColumn('LawyerProfiles', 'state', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'State where the lawyer practices'
    });

    await queryInterface.addColumn('LawyerProfiles', 'secondary_specialization', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
      comment: 'Additional areas of legal expertise'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('LawyerProfiles', 'photo');
    await queryInterface.removeColumn('LawyerProfiles', 'cv');
    await queryInterface.removeColumn('LawyerProfiles', 'state');
    await queryInterface.removeColumn('LawyerProfiles', 'secondary_specialization');
  }
};
