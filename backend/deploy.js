#!/usr/bin/env node

/**
 * Deployment script for Kanoonwise backend
 * This script runs database migrations and seeds for production deployment
 */

require("dotenv").config();
const { exec } = require("child_process");
const path = require("path");

console.log("🚀 Starting Kanoonwise deployment...");
console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);

// Function to run shell commands
function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n🔄 ${description}...`);
    console.log(`💻 Running: ${command}`);
    
    exec(command, { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error in ${description}:`, error.message);
        console.error(`stderr: ${stderr}`);
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
    // Check if database connection is working
    console.log("\n🔍 Checking database connection...");
    
    // Run migrations
    await runCommand(
      "npx sequelize-cli db:migrate",
      "Running database migrations"
    );
    
    // Run seeds (only if in development or if explicitly requested)
    if (process.env.NODE_ENV !== "production" || process.env.RUN_SEEDS === "true") {
      await runCommand(
        "npx sequelize-cli db:seed:all",
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
