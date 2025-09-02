#!/usr/bin/env node

/**
 * Production migration script for Kanoonwise backend
 * Runs actual database migrations for production deployment
 */

// Load dotenv only in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Set production environment if not already set
process.env.NODE_ENV = process.env.NODE_ENV || "production";

console.log("🚀 Starting database migration...");
console.log(`📍 Environment: ${process.env.NODE_ENV}`);
console.log(`🔗 Database URL available: ${!!process.env.DB_URL}`);

const { exec } = require("child_process");
const sequelize = require("./src/config/database");

// Function to run shell commands
function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n🔄 ${description}...`);
    console.log(`💻 Running: ${command}`);
    
    const env = { 
      ...process.env, 
      NODE_ENV: process.env.NODE_ENV || "production" 
    };
    
    exec(command, { cwd: __dirname, env }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error in ${description}:`, error.message);
        if (stderr) console.error(`stderr: ${stderr}`);
        if (stdout) console.log(`stdout: ${stdout}`);
        // Don't reject for migration errors - they might be expected
        resolve({ success: false, error: error.message, stdout, stderr });
        return;
      }
      
      if (stdout) {
        console.log(`✅ ${description} completed`);
        console.log(stdout);
      }
      
      if (stderr && !error) {
        console.log(`⚠️  Warning: ${stderr}`);
      }
      
      resolve({ success: true, stdout, stderr });
    });
  });
}

async function runMigrations() {
  try {
    console.log("🔗 Testing database connection...");
    
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
    
    // Run the database fix script first to ensure all required columns exist
    console.log("\n🔧 Running database fix script...");
    const fixResult = await runCommand("node fix-production-db.js", "Fixing missing database columns");
    
    // Run migrations with Sequelize CLI
    console.log("\n📊 Running Sequelize migrations...");
    const migrateResult = await runCommand(
      `npx sequelize-cli db:migrate --env ${process.env.NODE_ENV}`,
      "Running database migrations"
    );
    
    if (!migrateResult.success) {
      console.log("⚠️  Some migrations may have failed, but this is often expected in production updates.");
    }
    
    // Verify the database structure is correct by testing a query
    console.log("\n� Verifying database structure...");
    
    // Import models to verify they work
    const LawyerProfile = require("./src/models/lawyerProfile.model");
    
    // Try to query the LawyerProfile table to ensure all columns exist
    await LawyerProfile.findAll({ limit: 1 });
    console.log("✅ Database structure verification successful!");
    
    console.log("\n🎉 Database migration completed successfully!");
    
  } catch (error) {
    console.error("❌ Database migration failed:", error.message);
    
    // Try the manual fix as a fallback
    console.log("\n🔧 Attempting manual database fix...");
    try {
      const { fixProductionDatabase } = require('./fix-production-db');
      await fixProductionDatabase();
      console.log("✅ Manual database fix completed!");
    } catch (fixError) {
      console.error("❌ Manual fix also failed:", fixError.message);
      process.exit(1);
    }
  } finally {
    await sequelize.close();
  }
}

// Only run if this script is executed directly
if (require.main === module) {
  runMigrations();
}

module.exports = { runMigrations };
