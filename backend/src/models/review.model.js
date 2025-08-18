const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const LawyerProfile = require('./lawyerProfile.model');
const ClientProfile = require('./clientProfile.model');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  lawyer_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: LawyerProfile,
      key: 'id',
    },
  },
  client_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: ClientProfile,
      key: 'id',
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  review_text: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

LawyerProfile.hasMany(Review, { foreignKey: 'lawyer_id' });
Review.belongsTo(LawyerProfile, { foreignKey: 'lawyer_id' });

ClientProfile.hasMany(Review, { foreignKey: 'client_id' });
Review.belongsTo(ClientProfile, { foreignKey: 'client_id' });

module.exports = Review;
