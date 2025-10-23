'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if column already exists
    const tableDescription = await queryInterface.describeTable('StampOrders');
    
    if (!tableDescription.promoCodeId) {
      await queryInterface.addColumn('StampOrders', 'promoCodeId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'StampPromoCodes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });

      // Add index for faster lookups
      await queryInterface.addIndex('StampOrders', ['promoCodeId']);
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable('StampOrders');
    
    if (tableDescription.promoCodeId) {
      // Remove index first
      await queryInterface.removeIndex('StampOrders', ['promoCodeId']);
      
      // Remove column
      await queryInterface.removeColumn('StampOrders', 'promoCodeId');
    }
  },
};
