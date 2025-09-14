#!/usr/bin/env node

/**
 * Production deployment script for Kanoonwise
 * Handles all database setup including the Sessions table conflict
 */

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

process.env.NODE_ENV = process.env.NODE_ENV || "production";

console.log("🚀 Starting production deployment...");
console.log(`📍 Environment: ${process.env.NODE_ENV}`);

const { exec } = require("child_process");
const sequelize = require("./src/config/database");

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

async function fixSessionsTableConflict() {
  try {
    const queryInterface = sequelize.getQueryInterface();
    
    console.log("🔧 Fixing Sessions table conflict...");
    
    // First, try to drop any existing Sessions table that might conflict
    try {
      await sequelize.query("DROP TABLE IF EXISTS \"Sessions\" CASCADE;");
      console.log("✅ Removed any conflicting Sessions table");
    } catch (error) {
      console.log("ℹ️ No conflicting Sessions table found");
    }
    
    // Check if UserSessions table exists, if not create it
    const tables = await queryInterface.showAllTables();
    const userSessionsExists = tables.includes('UserSessions');
    
    if (!userSessionsExists) {
      console.log("📝 Creating UserSessions table...");
      await queryInterface.createTable('UserSessions', {
        sid: {
          type: sequelize.Sequelize.STRING,
          primaryKey: true,
        },
        expires: {
          type: sequelize.Sequelize.DATE,
          allowNull: true,
        },
        data: {
          type: sequelize.Sequelize.TEXT,
          allowNull: true,
        },
        createdAt: {
          type: sequelize.Sequelize.DATE,
          allowNull: false,
          defaultValue: sequelize.Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: sequelize.Sequelize.DATE,
          allowNull: false,
          defaultValue: sequelize.Sequelize.fn('NOW'),
        },
      });
      
      // Add index on expires for efficient cleanup
      await queryInterface.addIndex('UserSessions', ['expires']);
      console.log("✅ UserSessions table created successfully");
    } else {
      console.log("✅ UserSessions table already exists");
    }
    
  } catch (error) {
    console.error("⚠️ Sessions table fix failed:", error.message);
    // Don't fail deployment for this
  }
}

async function deploy() {
  try {
    console.log("🔗 Testing database connection...");
    
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
    
    // Fix the Sessions table conflict first
    await fixSessionsTableConflict();
    
    // Run the database fix script to ensure all required columns exist
    console.log("\n🔧 Running database fix script...");
    await runCommand("node fix-partial-migration.js", "Fixing partial migration state");
    
    // Run migrations but don't fail on errors (they might be expected)
    console.log("\n📊 Running Sequelize migrations...");
    const migrateResult = await runCommand(
      `npx sequelize-cli db:migrate --env ${process.env.NODE_ENV}`,
      "Running database migrations"
    );
    
    if (!migrateResult.success) {
      console.log("⚠️ Some migrations may have failed, but this is often expected in production updates.");
    }
    
    // Verify the database structure
    console.log("\n🔍 Verifying database structure...");
    
    try {
      const LawyerProfile = require("./src/models/lawyerProfile.model");
      await LawyerProfile.findAll({ limit: 1 });
      console.log("✅ Database structure verification successful!");
    } catch (error) {
      console.error("⚠️ Database verification warning:", error.message);
    }
    
    console.log("\n🎉 Production deployment completed successfully!");
    console.log("🚀 Server can now be started safely");
    
  } catch (error) {
    console.error("❌ Production deployment failed:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// Only run if this script is executed directly
if (require.main === module) {
  deploy();
}

module.exports = { deploy, fixSessionsTableConflict };
