const User = require('./user.model');
const Package = require('./package.model');
const Order = require('./order.model');
const LawyerProfile = require('./lawyerProfile.model');
const ClientProfile = require('./clientProfile.model');
const Appointment = require('./appointment.model');
const Review = require('./review.model');
const UserSession = require('./userSession.model');
const StampTemplate = require('./StampTemplate');
const StampOrder = require('./StampOrder');
const StampPromoCode = require('./StampPromoCode');

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

// Stamp associations
StampTemplate.hasMany(StampOrder, {
  foreignKey: 'templateId',
  as: 'orders'
});
StampOrder.belongsTo(StampTemplate, {
  foreignKey: 'templateId',
  as: 'template'
});

User.hasMany(StampOrder, {
  foreignKey: 'userId',
  as: 'stampOrders'
});
StampOrder.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

StampPromoCode.hasMany(StampOrder, {
  foreignKey: 'promoCodeId',
  as: 'orders'
});
StampOrder.belongsTo(StampPromoCode, {
  foreignKey: 'promoCodeId',
  as: 'appliedPromoCode'  // Changed from 'promoCode' to avoid collision with string field
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
  StampTemplate,
  StampOrder,
  StampPromoCode,
};