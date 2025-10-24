#!/usr/bin/env node

/**
 * Test production session store configuration
 */

require("dotenv").config();
process.env.NODE_ENV = "production";

const sequelize = require("./src/config/database");
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

async function testSessionStore() {
  console.log("🧪 Testing production session store...\n");
  
  try {
    // Test database connection first
    console.log("1️⃣ Testing database connection...");
    await sequelize.authenticate();
    console.log("   ✅ Database connected\n");
    
    // Check if Sessions table exists (express-session)
    console.log("2️⃣ Checking Sessions table (express-session)...");
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log(`   Found tables: ${tables.join(', ')}`);
    
    if (tables.includes('Sessions')) {
      console.log("   ✅ Sessions table exists\n");
      
      // Describe the table structure
      const tableInfo = await sequelize.getQueryInterface().describeTable('Sessions');
      console.log("   Table structure:");
      Object.keys(tableInfo).forEach(col => {
        console.log(`      • ${col}: ${tableInfo[col].type}`);
      });
      console.log("");
    } else {
      console.log("   ❌ Sessions table NOT FOUND\n");
    }
    
    // Also check UserSessions (JWT refresh tokens)
    console.log("3️⃣ Checking UserSessions table (JWT refresh tokens)...");
    if (tables.includes('UserSessions')) {
      console.log("   ✅ UserSessions table exists");
      const count = await sequelize.query(
        'SELECT COUNT(*) as count FROM "UserSessions"',
        { type: sequelize.QueryTypes.SELECT }
      );
      console.log(`   📊 ${count[0].count} JWT sessions stored\n`);
    }
    
    // Try to create session store
    console.log("4️⃣ Creating session store...");
    const store = new SequelizeStore({
      db: sequelize,
      tableName: 'Sessions', // Use Sessions not UserSessions
      checkExpirationInterval: 15 * 60 * 1000,
      expiration: 24 * 60 * 60 * 1000
    });
    console.log("   ✅ Session store created\n");
    
    // Try to sync
    console.log("5️⃣ Syncing session store...");
    await store.sync();
    console.log("   ✅ Session store synced\n");
    
    // Try a test query
    console.log("6️⃣ Testing session query...");
    const Session = store.sessionModel;
    const count = await Session.count();
    console.log(`   ✅ Found ${count} express-sessions in Sessions table\n`);
    
    console.log("🎉 All tests passed! Production session store is working.\n");
    
  } catch (error) {
    console.error("\n❌ Test failed:", error.message);
    console.error("\nFull error:");
    console.error(error);
  } finally {
    await sequelize.close();
    console.log("🔌 Connection closed");
  }
}

testSessionStore();
