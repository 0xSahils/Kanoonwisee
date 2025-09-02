#!/usr/bin/env node

/**
 * Test script to verify session store configuration
 */

require("dotenv").config();
process.env.NODE_ENV = "production";

const sequelize = require("./src/config/database");

async function testSessionStore() {
  try {
    console.log("🧪 Testing session store configuration...");
    
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connection successful");
    
    // Check if UserSessions table exists
    const queryInterface = sequelize.getQueryInterface();
    const tables = await queryInterface.showAllTables();
    
    if (tables.includes('UserSessions')) {
      console.log("✅ UserSessions table exists");
      
      // Test the session store by importing and initializing it
      const { sessionOptions } = require('./src/config/security');
      
      if (sessionOptions.store) {
        console.log("🔄 Testing session store initialization...");
        await sessionOptions.store.sync();
        console.log("✅ Session store initialized successfully");
      } else {
        console.log("ℹ️ Session store not configured (development mode)");
      }
    } else {
      console.log("❌ UserSessions table does not exist");
    }
    
    console.log("🎉 Session store test completed!");
    
  } catch (error) {
    console.error("❌ Session store test failed:", error.message);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

if (require.main === module) {
  testSessionStore();
}

module.exports = { testSessionStore };
