const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable(
      "ClientProfiles"
    );

    const columnsToAdd = [
      { name: "address", type: DataTypes.TEXT },
      { name: "state", type: DataTypes.STRING },
      { name: "pincode", type: DataTypes.STRING },
      { name: "date_of_birth", type: DataTypes.DATE },
      { name: "occupation", type: DataTypes.STRING },
      { name: "emergency_contact", type: DataTypes.STRING },
      { name: "legal_history", type: DataTypes.TEXT },
    ];

    // Add columns only if they don't exist
    for (const column of columnsToAdd) {
      if (!tableDescription[column.name]) {
        await queryInterface.addColumn("ClientProfiles", column.name, {
          type: column.type,
          allowNull: true,
        });
      }
    }

    // Add enum column with special handling
    if (!tableDescription.preferred_communication) {
      await queryInterface.addColumn(
        "ClientProfiles",
        "preferred_communication",
        {
          type: DataTypes.ENUM("email", "phone", "both"),
          defaultValue: "email",
          allowNull: true,
        }
      );
    }

    // Add updated_at column if it doesn't exist
    if (!tableDescription.updated_at) {
      await queryInterface.addColumn("ClientProfiles", "updated_at", {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      });
    }
  },

  down: async (queryInterface) => {
    const tableDescription = await queryInterface.describeTable(
      "ClientProfiles"
    );

    const columnsToRemove = [
      "address",
      "state",
      "pincode",
      "date_of_birth",
      "occupation",
      "emergency_contact",
      "preferred_communication",
      "legal_history",
      "updated_at",
    ];

    // Remove columns only if they exist
    for (const column of columnsToRemove) {
      if (tableDescription[column]) {
        await queryInterface.removeColumn("ClientProfiles", column);
      }
    }
  },
};
