#!/usr/bin/env node

/**
 * Deployment script for Kanoonwise backend
 * This script runs database migrations and seeds for production deployment
 */

require("dotenv").config();
const { exec } = require("child_process");
const path = require("path");

// Set production environment if not already set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "production";
}

console.log("🚀 Starting Kanoonwise deployment...");
console.log(`📍 Environment: ${process.env.NODE_ENV}`);
console.log(`🔗 Database URL: ${process.env.DB_URL ? 'Connected' : 'Not found'}`);

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
        if (stdout) console.error(`stdout: ${stdout}`);
        reject(error);
        return;
      }
      
      if (stdout) {
        console.log(`✅ ${description} completed successfully`);
        console.log(stdout);
      }
      
      if (stderr && !error) {
        console.log(`⚠️  Warning: ${stderr}`);
      }
      
      resolve(stdout);
    });
  });
}

async function deploy() {
  try {
    // Verify environment variables
    if (!process.env.DB_URL) {
      throw new Error("DB_URL environment variable is not set");
    }
    
    console.log("\n🔍 Verifying Sequelize CLI installation...");
    try {
      await runCommand("npx sequelize-cli --version", "Checking Sequelize CLI");
    } catch (error) {
      console.log("📦 Installing Sequelize CLI...");
      await runCommand("npm install -g sequelize-cli", "Installing Sequelize CLI globally");
    }
    
    // Check if database connection is working
    console.log("\n🔍 Checking database connection...");
    
    // Run migrations with explicit environment
    await runCommand(
      `NODE_ENV=${process.env.NODE_ENV} npx sequelize-cli db:migrate --env ${process.env.NODE_ENV}`,
      "Running database migrations"
    );
    
    // Run seeds (only if in development or if explicitly requested)
    if (process.env.NODE_ENV !== "production" || process.env.RUN_SEEDS === "true") {
      await runCommand(
        `NODE_ENV=${process.env.NODE_ENV} npx sequelize-cli db:seed:all --env ${process.env.NODE_ENV}`,
        "Running database seeds"
      );
    } else {
      console.log("⏭️  Skipping seeds in production (set RUN_SEEDS=true to run)");
    }
    
    console.log("\n🎉 Deployment completed successfully!");
    console.log("🌐 Your application is ready to serve requests.");
    
  } catch (error) {
    console.error("\n💥 Deployment failed:", error.message);
    process.exit(1);
  }
}

// Only run if this script is executed directly
if (require.main === module) {
  deploy();
}

module.exports = { deploy };
