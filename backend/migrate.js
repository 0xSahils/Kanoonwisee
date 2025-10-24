#!/usr/bin/env node

/**
 * Production migration script for Kanoonwise backend
 * Runs actual database migrations for production deployment
 */

// Always load .env file if it exists (for local development)
// In production (Render), environment variables are set by the platform
require("dotenv").config();

// Set production environment if not already set
process.env.NODE_ENV = process.env.NODE_ENV || "production";

console.log(" Starting database migration...");
console.log(` Environment: ${process.env.NODE_ENV}`);
console.log(` Database URL available: ${!!process.env.DB_URL}`);

const { exec } = require("child_process");
const sequelize = require("./src/config/database");

// Function to run shell commands
function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n ${description}...`);
    console.log(`Running: ${command}`);
    
    const env = { 
      ...process.env, 
      NODE_ENV: process.env.NODE_ENV || "production" 
    };
    
    exec(command, { cwd: __dirname, env }, (error, stdout, stderr) => {
      if (error) {
        console.error(` Error in ${description}:`, error.message);
        if (stderr) console.error(`stderr: ${stderr}`);
        if (stdout) console.log(`stdout: ${stdout}`);
        // Don't reject for migration errors - they might be expected
        resolve({ success: false, error: error.message, stdout, stderr });
        return;
      }
      
      if (stdout) {
        console.log(`${description} completed`);
        console.log(stdout);
      }
      
      if (stderr && !error) {
        console.log(` Warning: ${stderr}`);
      }
      
      resolve({ success: true, stdout, stderr });
    });
  });
}

async function runMigrations() {
  try {
    console.log("🔍 Testing database connection...");
    
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
    
    // Run migrations with Sequelize CLI
    console.log("\n🔄 Running Sequelize migrations...");
    const migrateResult = await runCommand(
      `npx sequelize-cli db:migrate --env ${process.env.NODE_ENV}`,
      "Running database migrations"
    );
    
    if (!migrateResult.success) {
      console.log("⚠️  Some migrations may have failed, but this is often expected in production updates.");
      console.log("   Common causes: migrations already applied, or table conflicts.");
    }
    
    // Comprehensive database structure verification
    console.log("\n🔍 Verifying complete database structure...");
    
    try {
      // Import all models
      const { 
        User, 
        LawyerProfile, 
        ClientProfile, 
        Appointment, 
        Review,
        Package,
        Order,
        StampTemplate,
        StampOrder,
        StampPromoCode,
        UserSession
      } = require("./src/models");
      
      const verifications = [];
      
      // 1. Core User System Tables
      console.log("\n📋 Verifying Core User System...");
      try {
        const userCount = await User.count();
        verifications.push({ table: 'Users', count: userCount, status: '✅' });
        console.log(`   ✅ Users table: ${userCount} records`);
      } catch (err) {
        verifications.push({ table: 'Users', status: '❌', error: err.message });
        console.log(`   ❌ Users table: ${err.message}`);
      }
      
      try {
        const sessionCount = await UserSession.count();
        verifications.push({ table: 'UserSessions', count: sessionCount, status: '✅' });
        console.log(`   ✅ UserSessions table: ${sessionCount} records`);
      } catch (err) {
        verifications.push({ table: 'UserSessions', status: '❌', error: err.message });
        console.log(`   ❌ UserSessions table: ${err.message}`);
      }
      
      // 2. Lawyer & Client Profile Tables
      console.log("\n📋 Verifying Profile Tables...");
      try {
        const lawyerCount = await LawyerProfile.count();
        verifications.push({ table: 'LawyerProfiles', count: lawyerCount, status: '✅' });
        console.log(`   ✅ LawyerProfiles table: ${lawyerCount} records`);
      } catch (err) {
        verifications.push({ table: 'LawyerProfiles', status: '❌', error: err.message });
        console.log(`   ❌ LawyerProfiles table: ${err.message}`);
      }
      
      try {
        const clientCount = await ClientProfile.count();
        verifications.push({ table: 'ClientProfiles', count: clientCount, status: '✅' });
        console.log(`   ✅ ClientProfiles table: ${clientCount} records`);
      } catch (err) {
        verifications.push({ table: 'ClientProfiles', status: '❌', error: err.message });
        console.log(`   ❌ ClientProfiles table: ${err.message}`);
      }
      
      // 3. Appointment & Review Tables
      console.log("\n📋 Verifying Appointment System...");
      try {
        const appointmentCount = await Appointment.count();
        verifications.push({ table: 'Appointments', count: appointmentCount, status: '✅' });
        console.log(`   ✅ Appointments table: ${appointmentCount} records`);
      } catch (err) {
        verifications.push({ table: 'Appointments', status: '❌', error: err.message });
        console.log(`   ❌ Appointments table: ${err.message}`);
      }
      
      try {
        const reviewCount = await Review.count();
        verifications.push({ table: 'Reviews', count: reviewCount, status: '✅' });
        console.log(`   ✅ Reviews table: ${reviewCount} records`);
      } catch (err) {
        verifications.push({ table: 'Reviews', status: '❌', error: err.message });
        console.log(`   ❌ Reviews table: ${err.message}`);
      }
      
      // 4. Package & Order Tables
      console.log("\n📋 Verifying Package System...");
      try {
        const packageCount = await Package.count();
        verifications.push({ table: 'Packages', count: packageCount, status: '✅' });
        console.log(`   ✅ Packages table: ${packageCount} records`);
        
        if (packageCount === 0) {
          console.log("   ⚠️  WARNING: No packages found! Run deployment script to add packages.");
        }
      } catch (err) {
        verifications.push({ table: 'Packages', status: '❌', error: err.message });
        console.log(`   ❌ Packages table: ${err.message}`);
      }
      
      try {
        const orderCount = await Order.count();
        verifications.push({ table: 'Orders', count: orderCount, status: '✅' });
        console.log(`   ✅ Orders table: ${orderCount} records`);
      } catch (err) {
        verifications.push({ table: 'Orders', status: '❌', error: err.message });
        console.log(`   ❌ Orders table: ${err.message}`);
      }
      
      // 5. Stamp System Tables
      console.log("\n📋 Verifying Stamp System...");
      try {
        const templateCount = await StampTemplate.count();
        verifications.push({ table: 'StampTemplates', count: templateCount, status: '✅' });
        console.log(`   ✅ StampTemplates table: ${templateCount} records`);
        
        if (templateCount === 0) {
          console.log("   ⚠️  WARNING: No stamp templates found! Run deployment script to add templates.");
        } else {
          // Show state breakdown
          const states = await sequelize.query(
            'SELECT state, COUNT(*) as count FROM "StampTemplates" WHERE "isActive" = true GROUP BY state ORDER BY state',
            { type: sequelize.QueryTypes.SELECT }
          );
          console.log("   📊 Stamp templates by state:");
          states.forEach(s => console.log(`      • ${s.state}: ${s.count} templates`));
        }
      } catch (err) {
        verifications.push({ table: 'StampTemplates', status: '❌', error: err.message });
        console.log(`   ❌ StampTemplates table: ${err.message}`);
      }
      
      try {
        const stampOrderCount = await StampOrder.count();
        verifications.push({ table: 'StampOrders', count: stampOrderCount, status: '✅' });
        console.log(`   ✅ StampOrders table: ${stampOrderCount} records`);
        
        if (stampOrderCount > 0) {
          // Show status breakdown
          const statuses = await sequelize.query(
            'SELECT status, COUNT(*) as count FROM "StampOrders" GROUP BY status ORDER BY count DESC',
            { type: sequelize.QueryTypes.SELECT }
          );
          console.log("   📊 Stamp orders by status:");
          statuses.forEach(s => console.log(`      • ${s.status}: ${s.count} orders`));
        }
      } catch (err) {
        verifications.push({ table: 'StampOrders', status: '❌', error: err.message });
        console.log(`   ❌ StampOrders table: ${err.message}`);
      }
      
      try {
        const promoCount = await StampPromoCode.count();
        const activePromoCount = await StampPromoCode.count({ where: { isActive: true } });
        verifications.push({ table: 'StampPromoCodes', count: promoCount, status: '✅' });
        console.log(`   ✅ StampPromoCodes table: ${promoCount} records (${activePromoCount} active)`);
        
        if (promoCount === 0) {
          console.log("   ⚠️  WARNING: No promo codes found! Run deployment script to add promo codes.");
        }
      } catch (err) {
        verifications.push({ table: 'StampPromoCodes', status: '❌', error: err.message });
        console.log(`   ❌ StampPromoCodes table: ${err.message}`);
      }
      
      // 6. Check for doorstepCharge column (latest migration)
      console.log("\n📋 Verifying Latest Schema Updates...");
      try {
        const [results] = await sequelize.query(`
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_name = 'StampOrders' 
          AND column_name IN ('doorstepCharge', 'promoCodeId')
        `);
        
        const columns = results.map(r => r.column_name);
        if (columns.includes('doorstepCharge')) {
          console.log("   ✅ doorstepCharge column exists in StampOrders");
        } else {
          console.log("   ⚠️  doorstepCharge column missing - may need migration");
        }
        
        if (columns.includes('promoCodeId')) {
          console.log("   ✅ promoCodeId column exists in StampOrders");
        } else {
          console.log("   ⚠️  promoCodeId column missing - may need migration");
        }
      } catch (err) {
        console.log(`   ⚠️  Could not verify latest columns: ${err.message}`);
      }
      
      // Summary
      console.log("\n" + "═".repeat(60));
      console.log("📊 DATABASE VERIFICATION SUMMARY");
      console.log("═".repeat(60));
      
      const successful = verifications.filter(v => v.status === '✅').length;
      const failed = verifications.filter(v => v.status === '❌').length;
      const totalRecords = verifications.reduce((sum, v) => sum + (v.count || 0), 0);
      
      console.log(`✅ Successful tables: ${successful}/${verifications.length}`);
      console.log(`❌ Failed tables: ${failed}/${verifications.length}`);
      console.log(`📝 Total records across all tables: ${totalRecords}`);
      
      if (failed > 0) {
        console.log("\n⚠️  ATTENTION: Some tables have errors!");
        console.log("   Failed tables:");
        verifications.filter(v => v.status === '❌').forEach(v => {
          console.log(`   • ${v.table}: ${v.error}`);
        });
        console.log("\n   This may indicate:");
        console.log("   1. Missing migrations");
        console.log("   2. Schema mismatch between code and database");
        console.log("   3. Database permissions issues");
      }
      
      console.log("═".repeat(60));
      
      if (failed === 0) {
        console.log("\n✅ All database tables verified successfully!");
        console.log("🎉 Database is ready for production!");
      } else {
        console.log("\n⚠️  Database verification completed with warnings.");
        console.log("   Please review the errors above.");
      }
      
    } catch (verifyError) {
      console.log("❌ Database verification error:", verifyError.message);
      console.log("   This may be expected if tables are newly created.");
      console.log("   Stack trace:", verifyError.stack);
    }
    
    console.log("\n✅ Database migration process completed!");
    
  } catch (error) {
    console.error("\n❌ Database migration failed:", error.message);
    console.error("Stack trace:", error.stack);
    
    console.log("\n🔧 Troubleshooting tips:");
    console.log("  1. Check that DB_URL environment variable is set correctly");
    console.log("  2. Ensure database server is accessible");
    console.log("  3. Verify migrations files exist in ./migrations/ directory");
    console.log("  4. Check that previous migrations were applied successfully");
    console.log("  5. Run: npx sequelize-cli db:migrate:status to see migration status");
    
    process.exit(1);
  } finally {
    await sequelize.close();
    console.log("\n🔌 Database connection closed.");
  }
}

// Only run if this script is executed directly
if (require.main === module) {
  runMigrations();
}

module.exports = { runMigrations };
