const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StampPromoCode = sequelize.define(
  'StampPromoCode',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    discountType: {
      type: DataTypes.ENUM('percentage', 'fixed'),
      allowNull: false,
    },
    discountValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxDiscount: DataTypes.INTEGER,
    minOrderAmount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    validFrom: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    validUntil: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    usageLimit: DataTypes.INTEGER,
    usageCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'StampPromoCodes',
    timestamps: true,
  }
);

// Instance methods
StampPromoCode.prototype.isValid = function(orderAmount) {
  const now = new Date();
  return (
    this.isActive &&
    now >= this.validFrom &&
    now <= this.validUntil &&
    orderAmount >= this.minOrderAmount &&
    (!this.usageLimit || this.usageCount < this.usageLimit)
  );
};

StampPromoCode.prototype.calculateDiscount = function(orderAmount) {
  if (!this.isValid(orderAmount)) return 0;

  if (this.discountType === 'percentage') {
    const discount = Math.floor((orderAmount * this.discountValue) / 100);
    return this.maxDiscount ? Math.min(discount, this.maxDiscount) : discount;
  } else {
    // fixed
    return Math.min(this.discountValue, orderAmount);
  }
};

module.exports = StampPromoCode;
