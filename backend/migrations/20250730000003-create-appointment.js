'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      lawyer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'LawyerProfiles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      client_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      consultation_type: {
        type: Sequelize.ENUM('online', 'offline'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'accepted', 'rejected', 'completed'),
        defaultValue: 'pending',
      },
      scheduled_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fee: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Appointments');
  }
};
