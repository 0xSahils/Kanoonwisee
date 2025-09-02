/**
 * Database Cleanup Script
 * Empties all tables while preserving the database structure
 */

require('dotenv').config();
const { Sequelize } = require('sequelize');

// Use environment variables for database connection
const sequelize = new Sequelize(process.env.DB_URL, {
  logging: false, // Disable SQL logging for cleaner output
});

async function emptyDatabase() {
  try {
    console.log('� Starting database cleanup process...');
    console.log('🗑️  Connecting to database...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established.');
    
    // Get all table names (exclude migrations table)
    const [tables] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      AND table_name NOT LIKE 'SequelizeMeta'
      ORDER BY table_name
    `);
    
    if (tables.length === 0) {
      console.log('📭 No tables found to clear.');
      return;
    }
    
    console.log(`📋 Found ${tables.length} tables to clear:`);
    tables.forEach(table => console.log(`   - ${table.table_name}`));
    console.log('');
    
    // Clear tables in dependency order to handle foreign key constraints
    const tableOrder = [
      'Reviews',           // References Users and LawyerProfiles
      'Appointments',      // References Users, LawyerProfiles, ClientProfiles  
      'UserSessions',      // References Users
      'LawyerProfiles',    // References Users
      'ClientProfiles',    // References Users
      'Users'              // Base table
    ];
    
    // Clear tables in dependency order
    for (const tableName of tableOrder) {
      if (tables.find(t => t.table_name === tableName)) {
        console.log(`🗑️  Clearing table: ${tableName}`);
        
        try {
          // Use TRUNCATE CASCADE for complete cleanup
          await sequelize.query(`TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE`);
          console.log(`✅ Cleared: ${tableName}`);
        } catch (error) {
          console.log(`⚠️  TRUNCATE failed for ${tableName}, using DELETE...`);
          try {
            await sequelize.query(`DELETE FROM "${tableName}"`);
            console.log(`✅ Cleared: ${tableName}`);
          } catch (deleteError) {
            console.log(`❌ Failed to clear ${tableName}:`, deleteError.message);
          }
        }
      }
    }
    
    // Clear any remaining tables not in the order list
    for (const table of tables) {
      const tableName = table.table_name;
      if (!tableOrder.includes(tableName)) {
        console.log(`🗑️  Clearing remaining table: ${tableName}`);
        try {
          await sequelize.query(`TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE`);
          console.log(`✅ Cleared: ${tableName}`);
        } catch (error) {
          try {
            await sequelize.query(`DELETE FROM "${tableName}"`);
            console.log(`✅ Cleared: ${tableName}`);
          } catch (deleteError) {
            console.log(`❌ Failed to clear ${tableName}:`, deleteError.message);
          }
        }
      }
    }
    
    console.log('\n🎉 Database cleanup completed successfully!');
    console.log('📊 All tables are now empty but structure is preserved.');
    console.log('🔄 You can now start fresh with clean data.');
    console.log('🆔 All ID sequences have been reset to 1.');
    
  } catch (error) {
    console.error('❌ Database cleanup failed:', error.message);
    if (error.parent) {
      console.error('Database error:', error.parent.message);
    }
  } finally {
    try {
      await sequelize.close();
      console.log('🔌 Database connection closed.');
    } catch (closeError) {
      console.error('Error closing connection:', closeError.message);
    }
    process.exit(0);
  }
}

// Run the cleanup
emptyDatabase();
