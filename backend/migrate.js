#!/usr/bin/env node

/**
 * Simple migration script for production deployment
 * Runs database sync to create tables
 */

// Load dotenv only in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Set production environment if not already set
process.env.NODE_ENV = process.env.NODE_ENV || "production";

console.log("🚀 Starting database setup...");
console.log(`📍 Environment: ${process.env.NODE_ENV}`);
console.log(`🔗 Database URL available: ${!!process.env.DB_URL}`);

// Debug environment variables
if (!process.env.DB_URL) {
  console.error("❌ DB_URL not found in environment variables");
  console.log("Available environment variables:");
  Object.keys(process.env)
    .filter(key => key.includes('DB') || key.includes('DATABASE'))
    .forEach(key => console.log(`  ${key}: ${process.env[key] ? 'SET' : 'NOT SET'}`));
}

const sequelize = require("./src/config/database");

// Import all models to register them with sequelize
const User = require("./src/models/user.model");
const LawyerProfile = require("./src/models/lawyerProfile.model");
const ClientProfile = require("./src/models/clientProfile.model");
const Appointment = require("./src/models/appointment.model");
const Review = require("./src/models/review.model");

async function runMigrations() {
  try {
    console.log("🔗 Connecting to database...");
    
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
    
    console.log("📊 Models loaded:");
    console.log("- User");
    console.log("- LawyerProfile");
    console.log("- ClientProfile");
    console.log("- Appointment");
    console.log("- Review");
    
    // Sync all models (create tables if they don't exist)
    console.log("📊 Syncing database models...");
    await sequelize.sync({ alter: false });
    console.log("✅ Database models synced successfully.");
    
    console.log("🎉 Database setup completed!");
    
  } catch (error) {
    console.error("❌ Database setup failed:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// Only run if this script is executed directly
if (require.main === module) {
  runMigrations();
}

module.exports = { runMigrations };
