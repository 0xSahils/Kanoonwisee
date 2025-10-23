'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Create StampTemplates table
    await queryInterface.createTable('StampTemplates', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      state: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      documentType: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      basePrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Default stamp value in paise',
      },
      convenienceFee: {
        type: Sequelize.INTEGER,
        defaultValue: 7697,
        comment: 'Platform service fee in paise',
      },
      description: {
        type: Sequelize.TEXT,
      },
      metadata: {
        type: Sequelize.JSONB,
        defaultValue: {},
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });

    await queryInterface.addIndex('StampTemplates', ['state', 'isActive']);
    await queryInterface.addIndex('StampTemplates', ['documentType']);

    // 2. Create StampOrders table
    await queryInterface.createTable('StampOrders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      templateId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'StampTemplates',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      // Document Details
      state: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      documentType: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      purpose: {
        type: Sequelize.TEXT,
      },
      // Party Details
      firstPartyName: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      firstPartyPhone: {
        type: Sequelize.STRING(15),
      },
      secondPartyName: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      secondPartyPhone: {
        type: Sequelize.STRING(15),
      },
      // Amount Details
      stampAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'User-entered stamp value in paise',
      },
      payingParty: {
        type: Sequelize.ENUM('first', 'second', 'both'),
        allowNull: false,
      },
      // Pricing
      basePrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      convenienceFee: {
        type: Sequelize.INTEGER,
        defaultValue: 7697,
      },
      serviceCharge: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      promoDiscount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      totalAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING(3),
        defaultValue: 'INR',
      },
      // Service Selection
      serviceType: {
        type: Sequelize.ENUM('standard', 'express'),
        defaultValue: 'standard',
      },
      doorstepDelivery: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      // Payment Details
      razorpayOrderId: {
        type: Sequelize.STRING(100),
      },
      razorpayPaymentId: {
        type: Sequelize.STRING(100),
      },
      razorpaySignature: {
        type: Sequelize.STRING(200),
      },
      promoCode: {
        type: Sequelize.STRING(50),
      },
      // Status Tracking
      status: {
        type: Sequelize.ENUM(
          'draft',
          'pending_payment',
          'payment_verified',
          'generating',
          'generated',
          'delivered',
          'failed',
          'cancelled',
          'revoked'
        ),
        defaultValue: 'draft',
      },
      // File Storage
      s3Key: {
        type: Sequelize.STRING(500),
      },
      s3PresignedUrl: {
        type: Sequelize.TEXT,
      },
      presignedUrlExpiry: {
        type: Sequelize.DATE,
      },
      // Verification
      verificationHash: {
        type: Sequelize.STRING(64),
      },
      // Guest Contact Info
      guestEmail: {
        type: Sequelize.STRING(255),
      },
      guestPhone: {
        type: Sequelize.STRING(15),
      },
      // Metadata
      metadata: {
        type: Sequelize.JSONB,
        defaultValue: {},
      },
      completedAt: {
        type: Sequelize.DATE,
      },
      expiresAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });

    await queryInterface.addIndex('StampOrders', ['userId']);
    await queryInterface.addIndex('StampOrders', ['status']);
    await queryInterface.addIndex('StampOrders', ['razorpayOrderId']);
    await queryInterface.addIndex('StampOrders', ['verificationHash']);
    await queryInterface.addIndex('StampOrders', ['state']);

    // 3. Create StampPromoCodes table
    await queryInterface.createTable('StampPromoCodes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      discountType: {
        type: Sequelize.ENUM('percentage', 'fixed'),
        allowNull: false,
      },
      discountValue: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Percentage value or amount in paise',
      },
      maxDiscount: {
        type: Sequelize.INTEGER,
        comment: 'Maximum discount cap in paise for percentage type',
      },
      minOrderAmount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      validFrom: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      validUntil: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      usageLimit: {
        type: Sequelize.INTEGER,
      },
      usageCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });

    await queryInterface.addIndex('StampPromoCodes', ['code']);
    await queryInterface.addIndex('StampPromoCodes', ['isActive']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('StampPromoCodes');
    await queryInterface.dropTable('StampOrders');
    await queryInterface.dropTable('StampTemplates');
  },
};
