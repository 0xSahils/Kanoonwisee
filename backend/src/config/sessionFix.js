/**
 * Session table fix utility
 * Handles PostgreSQL Sessions type conflict
 */

async function fixSessionsTableConflict(sequelize) {
  try {
    const queryInterface = sequelize.getQueryInterface();
    
    console.log("🔧 Checking for Sessions table conflict...");
    
    // Check if Sessions table exists and drop it if it does
    const tableExists = await queryInterface.showAllTables().then(tables => 
      tables.includes('Sessions')
    );
    
    if (tableExists) {
      console.log("🗑️ Dropping conflicting Sessions table...");
      await queryInterface.dropTable('Sessions');
      console.log("✅ Sessions table dropped");
    }
    
    // Check if UserSessions table exists, if not create it
    const userSessionsExists = await queryInterface.showAllTables().then(tables => 
      tables.includes('UserSessions')
    );
    
    if (!userSessionsExists) {
      console.log("📝 Creating UserSessions table...");
      await queryInterface.createTable('UserSessions', {
        sid: {
          type: sequelize.Sequelize.STRING,
          primaryKey: true,
        },
        expires: {
          type: sequelize.Sequelize.DATE,
          allowNull: true,
        },
        data: {
          type: sequelize.Sequelize.TEXT,
          allowNull: true,
        },
        createdAt: {
          type: sequelize.Sequelize.DATE,
          allowNull: false,
          defaultValue: sequelize.Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: sequelize.Sequelize.DATE,
          allowNull: false,
          defaultValue: sequelize.Sequelize.fn('NOW'),
        },
      });
      
      // Add index on expires for efficient cleanup
      await queryInterface.addIndex('UserSessions', ['expires']);
      console.log("✅ UserSessions table created successfully");
    } else {
      console.log("✅ UserSessions table already exists");
    }
    
  } catch (error) {
    console.error("⚠️ Warning: Sessions table fix failed:", error.message);
    throw error; // Re-throw so the caller can handle it
  }
}

module.exports = { fixSessionsTableConflict };
