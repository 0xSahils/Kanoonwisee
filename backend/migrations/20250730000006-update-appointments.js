"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable("Appointments");

    // Add client_id column only if it doesn't exist
    if (!tableDescription.client_id) {
      await queryInterface.addColumn("Appointments", "client_id", {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "ClientProfiles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }

    // Add case_description column only if it doesn't exist
    if (!tableDescription.case_description) {
      await queryInterface.addColumn("Appointments", "case_description", {
        type: Sequelize.TEXT,
        allowNull: true,
      });
    }
  },
  down: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable("Appointments");

    if (tableDescription.client_id) {
      await queryInterface.removeColumn("Appointments", "client_id");
    }
    if (tableDescription.case_description) {
      await queryInterface.removeColumn("Appointments", "case_description");
    }
  },
};
