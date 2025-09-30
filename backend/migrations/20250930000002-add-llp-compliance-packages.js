'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the LLP compliance packages
    const llpPackages = [
      {
        id: 'b5f1c3e0-1234-4567-8901-000000000019',
        name: 'LLP Filing Essentials',
        price: 9999.00,
        duration: 365,
        description: 'LLPs that maintain their own financial statements and just need expert filing.',
        features: JSON.stringify([
          'Penalty Protection Guarantee',
          'Filing of Form 11 (Annual Return)',
          'Filing of Form 8 (Statement of Account & Solvency)',
          'Designated Partner KYC'
        ]),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'b5f1c3e0-1234-4567-8901-000000000020',
        name: 'LLP Compliance Retainer',
        price: 19999.00,
        duration: 365,
        description: 'LLPs wanting a complete, end-to-end solution for their annual compliance.',
        features: JSON.stringify([
          'Penalty Protection Guarantee',
          'Filing of Form 11 (Annual Return)',
          'Filing of Form 8 (Statement of Account & Solvency)',
          'Designated Partner KYC',
          'Preparation of LLP Financial Statements',
          'Annual Income Tax Filing for the LLP'
        ]),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ];

    await queryInterface.bulkInsert('Packages', llpPackages, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the LLP compliance packages
    await queryInterface.bulkDelete('Packages', {
      id: {
        [Sequelize.Op.in]: ['b5f1c3e0-1234-4567-8901-000000000019', 'b5f1c3e0-1234-4567-8901-000000000020']
      }
    }, {});
  }
};