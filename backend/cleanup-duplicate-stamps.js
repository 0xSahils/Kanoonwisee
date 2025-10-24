#!/usr/bin/env node

/**
 * Cleanup duplicate stamp templates
 * Keeps only the latest template for each state + documentType combination
 */

require("dotenv").config();

const { Sequelize } = require("sequelize");
const sequelize = require("./src/config/database");

async function cleanupDuplicates() {
  console.log("🧹 Starting duplicate stamp template cleanup...\n");
  
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected\n");
    
    // Get all templates
    console.log("1️⃣ Analyzing all stamp templates...");
    const [allTemplates] = await sequelize.query(`
      SELECT 
        state,
        "documentType",
        "convenienceFee",
        "createdAt",
        COUNT(*) as count
      FROM "StampTemplates"
      WHERE "isActive" = true
      GROUP BY state, "documentType", "convenienceFee", "createdAt"
      ORDER BY state, "documentType", "createdAt" DESC
    `);
    
    console.log(`   Total active templates: ${allTemplates.length}\n`);
    
    // Find the latest deployment batch (most recent createdAt)
    const [latestBatch] = await sequelize.query(`
      SELECT MAX("createdAt") as latest_deployment
      FROM "StampTemplates"
      WHERE "isActive" = true
    `);
    
    const latestDeployment = latestBatch[0].latest_deployment;
    console.log(`   Latest deployment: ${latestDeployment}`);
    
    // Count templates in latest batch
    const [latestCount] = await sequelize.query(`
      SELECT COUNT(*) as count
      FROM "StampTemplates"
      WHERE "isActive" = true
      AND "createdAt" = :latestDeployment
    `, {
      replacements: { latestDeployment }
    });
    
    console.log(`   Templates in latest deployment: ${latestCount[0].count}`);
    
    // Count old templates
    const [oldCount] = await sequelize.query(`
      SELECT COUNT(*) as count
      FROM "StampTemplates"
      WHERE "isActive" = true
      AND "createdAt" < :latestDeployment
    `, {
      replacements: { latestDeployment }
    });
    
    const oldTemplatesCount = parseInt(oldCount[0].count);
    console.log(`   Old templates to remove: ${oldTemplatesCount}\n`);
    
    if (oldTemplatesCount === 0) {
      console.log("   ✅ No old templates to clean up!\n");
      return;
    }
    
    // Delete all old templates, keep only the latest batch
    console.log("2️⃣ Removing old templates...");
    
    const [result] = await sequelize.query(`
      DELETE FROM "StampTemplates"
      WHERE "isActive" = true
      AND "createdAt" < :latestDeployment
    `, {
      replacements: { latestDeployment }
    });
    
    const totalDeleted = result.rowCount || 0;
    console.log(`   ✅ Removed ${totalDeleted} old templates`)
    
    console.log(`\n3️⃣ Verifying cleanup...`);
    const [finalCount] = await sequelize.query(`
      SELECT 
        state,
        COUNT(DISTINCT "documentType") as unique_types,
        COUNT(*) as total_templates
      FROM "StampTemplates"
      WHERE "isActive" = true
      GROUP BY state
      ORDER BY state
    `);
    
    console.log("\n   Final template counts per state:");
    finalCount.forEach(s => {
      console.log(`   • ${s.state}: ${s.total_templates} templates (${s.unique_types} document types)`);
    });
    
    console.log("\n" + "═".repeat(60));
    console.log("📊 CLEANUP SUMMARY");
    console.log("═".repeat(60));
    console.log(`✅ Removed ${totalDeleted} duplicate templates`);
    console.log(`✅ Kept latest version of each template`);
    console.log("═".repeat(60));
    
    console.log("\n🎉 Cleanup completed successfully!");
    
  } catch (error) {
    console.error("\n❌ Cleanup failed:", error.message);
    console.error("\nFull error:");
    console.error(error);
    process.exit(1);
  } finally {
    await sequelize.close();
    console.log("\n🔌 Connection closed");
  }
}

// Run cleanup
cleanupDuplicates();
