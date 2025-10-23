const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StampOrder = sequelize.define(
  'StampOrder',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: DataTypes.UUID,
    templateId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    documentType: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    purpose: DataTypes.TEXT,
    firstPartyName: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    firstPartyPhone: DataTypes.STRING(15),
    secondPartyName: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    secondPartyPhone: DataTypes.STRING(15),
    stampAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payingParty: {
      type: DataTypes.ENUM('first', 'second', 'both'),
      allowNull: false,
    },
    basePrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    convenienceFee: {
      type: DataTypes.INTEGER,
      defaultValue: 7697,
    },
    serviceCharge: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    promoDiscount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(3),
      defaultValue: 'INR',
    },
    serviceType: {
      type: DataTypes.ENUM('standard', 'express'),
      defaultValue: 'standard',
    },
    doorstepDelivery: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    razorpayOrderId: DataTypes.STRING(100),
    razorpayPaymentId: DataTypes.STRING(100),
    razorpaySignature: DataTypes.STRING(200),
    promoCode: DataTypes.STRING(50),
    promoCodeId: DataTypes.UUID,
    status: {
      type: DataTypes.ENUM(
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
    s3Key: DataTypes.STRING(500),
    s3PresignedUrl: DataTypes.TEXT,
    presignedUrlExpiry: DataTypes.DATE,
    verificationHash: DataTypes.STRING(64),
    guestEmail: DataTypes.STRING(255),
    guestPhone: DataTypes.STRING(15),
    metadata: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    completedAt: DataTypes.DATE,
    expiresAt: DataTypes.DATE,
  },
  {
    tableName: 'StampOrders',
    timestamps: true,
  }
);

// Instance methods
StampOrder.prototype.isExpired = function() {
  return this.expiresAt && new Date() > this.expiresAt;
};

StampOrder.prototype.isOwnedBy = function(userId, email, phone) {
  if (this.userId && userId) {
    return this.userId === userId;
  }
  if (this.guestEmail && email) {
    return this.guestEmail.toLowerCase() === email.toLowerCase();
  }
  if (this.guestPhone && phone) {
    return this.guestPhone === phone;
  }
  return false;
};

module.exports = StampOrder;
