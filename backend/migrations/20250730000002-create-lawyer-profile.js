'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LawyerProfiles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bar_registration_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      specialization: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      court_practice: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      fee_structure: {
        type: Sequelize.JSON,
      },
      years_experience: {
        type: Sequelize.INTEGER,
      },
      languages: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      city: {
        type: Sequelize.STRING,
      },
      consultation_type: {
        type: Sequelize.ENUM('online', 'offline', 'both'),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('LawyerProfiles');
  }
};
