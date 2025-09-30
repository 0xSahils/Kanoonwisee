'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      order_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'Razorpay order_id',
      },
      package_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Packages',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        comment: 'Amount in smallest currency unit (paise for INR)',
      },
      currency: {
        type: Sequelize.STRING(3),
        allowNull: false,
        defaultValue: 'INR',
      },
      status: {
        type: Sequelize.ENUM('CREATED', 'PAID', 'FAILED', 'REFUNDED'),
        defaultValue: 'CREATED',
      },
      payment_id: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Razorpay payment_id',
      },
      signature: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Razorpay signature for verification',
      },
      receipt: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Custom receipt number',
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'JSON string of additional notes',
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

    // Add indexes for better performance
    await queryInterface.addIndex('Orders', ['order_id']);
    await queryInterface.addIndex('Orders', ['user_id']);
    await queryInterface.addIndex('Orders', ['package_id']);
    await queryInterface.addIndex('Orders', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};