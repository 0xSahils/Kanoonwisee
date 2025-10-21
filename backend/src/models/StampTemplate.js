const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StampTemplate = sequelize.define(
  'StampTemplate',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    documentType: {
      type: DataTypes.STRING(200),
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
    description: DataTypes.TEXT,
    metadata: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'StampTemplates',
    timestamps: true,
  }
);

module.exports = StampTemplate;
