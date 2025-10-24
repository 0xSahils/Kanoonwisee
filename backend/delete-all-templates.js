#!/usr/bin/env node

/**
 * Delete ALL stamp templates from database
 * This allows admin to add documents from the admin panel
 */

require("dotenv").config();
const sequelize = require("./src/config/database");

async function deleteAllTemplates() {
  console.log("🗑️  Deleting ALL stamp templates...\n");
  
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected\n");
    
    // Count before deletion
    const [beforeCount] = await sequelize.query(`
      SELECT COUNT(*) as count FROM "StampTemplates"
    `);
    
    console.log(`📊 Current templates in database: ${beforeCount[0].count}\n`);
    
    if (beforeCount[0].count === 0) {
      console.log("✅ No templates to delete!\n");
      return;
    }
    
    // Show breakdown by state before deletion
    const [byState] = await sequelize.query(`
      SELECT 
        state,
        COUNT(*) as count,
        "isActive"
      FROM "StampTemplates"
      GROUP BY state, "isActive"
      ORDER BY state, "isActive"
    `);
    
    console.log("Current templates by state:");
    byState.forEach(s => {
      console.log(`  • ${s.state}: ${s.count} templates (active: ${s.isActive})`);
    });
    
    // Confirm deletion
    console.log("\n⚠️  This will DELETE ALL stamp templates from the database!");
    console.log("   Proceeding in 2 seconds...\n");
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Delete all templates
    console.log("🗑️  Deleting all templates...");
    const [result] = await sequelize.query(`
      DELETE FROM "StampTemplates"
    `);
    
    const deleted = result.rowCount || beforeCount[0].count;
    
    console.log(`\n✅ Deleted ${deleted} templates`);
    
    // Verify deletion
    const [afterCount] = await sequelize.query(`
      SELECT COUNT(*) as count FROM "StampTemplates"
    `);
    
    console.log(`\n📊 Templates remaining: ${afterCount[0].count}`);
    
    console.log("\n" + "═".repeat(60));
    console.log("🎉 All stamp templates deleted successfully!");
    console.log("📝 Admin can now add document templates from admin panel");
    console.log("═".repeat(60));
    
  } catch (error) {
    console.error("\n❌ Deletion failed:", error.message);
    console.error("\nFull error:");
    console.error(error);
    process.exit(1);
  } finally {
    await sequelize.close();
    console.log("\n🔌 Connection closed");
  }
}

deleteAllTemplates();
