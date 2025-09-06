'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update photo column to JSON type
    await queryInterface.changeColumn('LawyerProfiles', 'photo', {
      type: Sequelize.JSON,
      allowNull: true,
      comment: 'S3 file metadata: {bucket, key, originalName, mimeType, size, uploadedAt}'
    });

    // Update cv column to JSON type
    await queryInterface.changeColumn('LawyerProfiles', 'cv', {
      type: Sequelize.JSON,
      allowNull: true,
      comment: 'S3 file metadata: {bucket, key, originalName, mimeType, size, uploadedAt}'
    });

    // Update bar_registration_file column to JSON type
    await queryInterface.changeColumn('LawyerProfiles', 'bar_registration_file', {
      type: Sequelize.JSON,
      allowNull: true,
      comment: 'S3 file metadata: {bucket, key, originalName, mimeType, size, uploadedAt}'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert photo column to STRING type
    await queryInterface.changeColumn('LawyerProfiles', 'photo', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'URL or path to lawyer profile photo'
    });

    // Revert cv column to STRING type
    await queryInterface.changeColumn('LawyerProfiles', 'cv', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'URL or path to lawyer CV document'
    });

    // Revert bar_registration_file column to STRING type
    await queryInterface.changeColumn('LawyerProfiles', 'bar_registration_file', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'URL or path to bar registration document'
    });
  }
};
