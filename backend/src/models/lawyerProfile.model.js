const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const LawyerProfile = sequelize.define('LawyerProfile', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bar_registration_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  specialization: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  court_practice: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  fee_structure: {
    type: DataTypes.JSON,
  },
  years_experience: {
    type: DataTypes.INTEGER,
  },
  languages: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  city: {
    type: DataTypes.STRING,
  },
  consultation_type: {
    type: DataTypes.ENUM('online', 'offline', 'both'),
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'S3 key for lawyer profile photo'
  },
  cv: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'S3 key for lawyer CV document'
  },
  bar_registration_file: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'S3 key for bar registration document'
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  secondary_specialization: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  approved: {
    type: DataTypes.ENUM('pending', 'approved', 'canceled'),
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

User.hasOne(LawyerProfile, { foreignKey: 'user_id' });
LawyerProfile.belongsTo(User, { foreignKey: 'user_id' });

module.exports = LawyerProfile;
