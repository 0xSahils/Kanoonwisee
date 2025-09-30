'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const packages = [
      {
        id: 'b4f1c3e0-1234-4567-8901-123456789012',
        name: 'Basic Plan',
        price: 999.00,
        duration: 30,
        description: 'Basic legal consultation package for 30 days',
        features: JSON.stringify([
          '3 consultations per month',
          'Email support',
          'Basic document review'
        ]),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'b4f1c3e0-1234-4567-8901-123456789013',
        name: 'Professional Plan',
        price: 1999.00,
        duration: 30,
        description: 'Professional legal services package for 30 days',
        features: JSON.stringify([
          '5 consultations per month',
          'Priority email support',
          'Document drafting',
          'Phone support'
        ]),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'b4f1c3e0-1234-4567-8901-123456789014',
        name: 'Premium Plan',
        price: 4999.00,
        duration: 30,
        description: 'Premium legal services package for 30 days',
        features: JSON.stringify([
          'Unlimited consultations',
          '24/7 priority support',
          'Complete document services',
          'Phone and video support',
          'Legal representation'
        ]),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Packages', packages, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Packages', null, {});
  }
};