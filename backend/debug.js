#!/usr/bin/env node

/**
 * Debug script to check environment variables and database connection
 */

console.log("🔍 Environment Debug Information");
console.log("================================");
console.log(`Node Environment: ${process.env.NODE_ENV}`);
console.log(`Platform: ${process.platform}`);
console.log(`Node Version: ${process.version}`);

console.log("\n📊 Database Environment Variables:");
const dbVars = ['DB_URL', 'DATABASE_URL', 'POSTGRES_URL', 'POSTGRESQL_URL'];
dbVars.forEach(varName => {
  const value = process.env[varName];
  console.log(`${varName}: ${value ? 'SET (length: ' + value.length + ')' : 'NOT SET'}`);
});

console.log("\n🔍 All Environment Variables containing 'DB' or 'DATABASE':");
Object.keys(process.env)
  .filter(key => key.toUpperCase().includes('DB') || key.toUpperCase().includes('DATABASE'))
  .forEach(key => {
    console.log(`${key}: ${process.env[key] ? 'SET' : 'NOT SET'}`);
  });

console.log("\n🧪 Testing Database Connection...");

try {
  // Try to load database config
  const database = require('./src/config/database');
  console.log("✅ Database configuration loaded successfully");
  
  // Test connection
  database.authenticate()
    .then(() => {
      console.log("✅ Database connection successful!");
      process.exit(0);
    })
    .catch(err => {
      console.error("❌ Database connection failed:", err.message);
      process.exit(1);
    });
    
} catch (error) {
  console.error("❌ Failed to load database configuration:", error.message);
  process.exit(1);
}
