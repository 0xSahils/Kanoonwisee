"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Check if the enum value already exists
      const [results] = await queryInterface.sequelize.query(`
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'client' 
        AND enumtypid = (
          SELECT oid FROM pg_type WHERE typname = 'enum_Users_role'
        )
      `);

      // Only add the enum value if it doesn't exist
      if (results.length === 0) {
        await queryInterface.sequelize.query(
          "ALTER TYPE \"enum_Users_role\" ADD VALUE 'client';"
        );
      }
    } catch (error) {
      // If the enum type doesn't exist, we can safely ignore this migration
      console.log("Enum type may not exist yet, skipping enum update");
    }
  },
  down: async (queryInterface, Sequelize) => {
    // Note: PostgreSQL doesn't support removing enum values easily
    // This would require recreating the enum type
    console.log("Cannot easily remove enum value in PostgreSQL");
  },
};
