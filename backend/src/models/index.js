const User = require('./user.model');
const Package = require('./package.model');
const Order = require('./order.model');
const LawyerProfile = require('./lawyerProfile.model');
const ClientProfile = require('./clientProfile.model');
const Appointment = require('./appointment.model');
const Review = require('./review.model');
const UserSession = require('./userSession.model');

// Define associations
// Package and Order relationship
Package.hasMany(Order, { 
  foreignKey: 'package_id', 
  as: 'orders' 
});
Order.belongsTo(Package, { 
  foreignKey: 'package_id', 
  as: 'package' 
});

// User and Order relationship
User.hasMany(Order, { 
  foreignKey: 'user_id', 
  as: 'orders' 
});
Order.belongsTo(User, { 
  foreignKey: 'user_id', 
  as: 'user' 
});

// Export all models
module.exports = {
  User,
  Package,
  Order,
  LawyerProfile,
  ClientProfile,
  Appointment,
  Review,
  UserSession,
};