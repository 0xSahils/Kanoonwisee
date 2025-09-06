'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Revert photo column to STRING type for S3 key storage
    await queryInterface.changeColumn('LawyerProfiles', 'photo', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'S3 key for lawyer profile photo'
    });

    // Revert cv column to STRING type for S3 key storage
    await queryInterface.changeColumn('LawyerProfiles', 'cv', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'S3 key for lawyer CV document'
    });

    // Revert bar_registration_file column to STRING type for S3 key storage
    await queryInterface.changeColumn('LawyerProfiles', 'bar_registration_file', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'S3 key for bar registration document'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Change back to JSON type
    await queryInterface.changeColumn('LawyerProfiles', 'photo', {
      type: Sequelize.JSON,
      allowNull: true,
      comment: 'S3 file metadata: {bucket, key, originalName, mimeType, size, uploadedAt}'
    });

    await queryInterface.changeColumn('LawyerProfiles', 'cv', {
      type: Sequelize.JSON,
      allowNull: true,
      comment: 'S3 file metadata: {bucket, key, originalName, mimeType, size, uploadedAt}'
    });

    await queryInterface.changeColumn('LawyerProfiles', 'bar_registration_file', {
      type: Sequelize.JSON,
      allowNull: true,
      comment: 'S3 file metadata: {bucket, key, originalName, mimeType, size, uploadedAt}'
    });
  }
};
