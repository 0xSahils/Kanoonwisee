const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const ClientProfile = sequelize.define('ClientProfile', {
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
  phone: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
  city: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  pincode: {
    type: DataTypes.STRING,
  },
  date_of_birth: {
    type: DataTypes.DATE,
  },
  occupation: {
    type: DataTypes.STRING,
  },
  emergency_contact: {
    type: DataTypes.STRING,
  },
  preferred_communication: {
    type: DataTypes.ENUM('email', 'phone', 'both'),
    defaultValue: 'email',
  },
  preferred_consultation_type: {
    type: DataTypes.ENUM('online', 'offline', 'both'),
    defaultValue: 'both',
  },
  legal_history: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

User.hasOne(ClientProfile, { foreignKey: 'user_id' });
ClientProfile.belongsTo(User, { foreignKey: 'user_id' });

module.exports = ClientProfile;
