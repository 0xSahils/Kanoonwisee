#!/usr/bin/env node

/**
 * Check actual stamp templates in database
 */

require("dotenv").config();
const sequelize = require("./src/config/database");

async function checkTemplates() {
  console.log("🔍 Checking stamp templates...\n");
  
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected\n");
    
    // Count all templates
    const [total] = await sequelize.query(`
      SELECT COUNT(*) as count FROM "StampTemplates"
    `);
    console.log(`Total templates (all): ${total[0].count}`);
    
    // Count active templates
    const [active] = await sequelize.query(`
      SELECT COUNT(*) as count FROM "StampTemplates" WHERE "isActive" = true
    `);
    console.log(`Total templates (active): ${active[0].count}\n`);
    
    // Group by state
    const [byState] = await sequelize.query(`
      SELECT 
        state,
        COUNT(*) as total,
        COUNT(DISTINCT "documentType") as unique_docs,
        MIN("createdAt") as first_created,
        MAX("createdAt") as last_created
      FROM "StampTemplates"
      WHERE "isActive" = true
      GROUP BY state
      ORDER BY state
    `);
    
    console.log("Templates by state:");
    byState.forEach(s => {
      console.log(`\n${s.state}:`);
      console.log(`  Total: ${s.total}`);
      console.log(`  Unique document types: ${s.unique_docs}`);
      console.log(`  First created: ${s.first_created}`);
      console.log(`  Last created: ${s.last_created}`);
    });
    
    // Show HARYANA templates in detail
    console.log("\n\nHARYANA templates detail:");
    const [haryana] = await sequelize.query(`
      SELECT 
        "documentType",
        "convenienceFee",
        "createdAt",
        id
      FROM "StampTemplates"
      WHERE state = 'HARYANA' AND "isActive" = true
      ORDER BY "documentType", "createdAt" DESC
      LIMIT 20
    `);
    
    haryana.forEach(t => {
      console.log(`  ${t.documentType} | ₹${t.convenienceFee/100} | ${t.createdAt}`);
    });
    
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.error(error);
  } finally {
    await sequelize.close();
    console.log("\n🔌 Connection closed");
  }
}

checkTemplates();
