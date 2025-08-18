const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const LawyerProfile = require('./lawyerProfile.model');
const ClientProfile = require('./clientProfile.model');

const Appointment = sequelize.define('Appointment', {
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
    allowNull: true, // nullable for backward compatibility
    references: {
      model: ClientProfile,
      key: 'id',
    },
  },
  client_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  consultation_type: {
    type: DataTypes.ENUM('online', 'offline'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'completed'),
    defaultValue: 'pending',
  },
  scheduled_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fee: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  case_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

LawyerProfile.hasMany(Appointment, { foreignKey: 'lawyer_id' });
Appointment.belongsTo(LawyerProfile, { foreignKey: 'lawyer_id' });

ClientProfile.hasMany(Appointment, { foreignKey: 'client_id' });
Appointment.belongsTo(ClientProfile, { foreignKey: 'client_id' });

module.exports = Appointment;
