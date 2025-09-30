'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the old generic OPC package
    await queryInterface.bulkDelete('Packages', {
      name: 'One Person Company (OPC) Registration'
    }, {});

    // Add the new separate OPC plan packages
    const opcPackages = [
      {
        id: 'b5f1c3e0-1234-4567-8901-000000000017',
        name: 'OPC Starter Plan',
        price: 1799.00,
        duration: 365,
        description: 'Basic One Person Company registration with essential services',
        features: JSON.stringify([
          'Expert legal assistance by Kanoonwise team',
          'Company Name Reservation (2–4 days)',
          'Digital Signature Certificate (DSC) – 4–7 days',
          'SPICe+ Form Filing – 14 days',
          'Incorporation Certificate – 14–21 days',
          'Company PAN & TAN',
          'DIN for Directors',
          '6 Months Free Legal Consultation'
        ]),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'b5f1c3e0-1234-4567-8901-000000000018',
        name: 'OPC Premium Plan',
        price: 29999.00,
        duration: 365,
        description: 'Complete One Person Company registration with annual compliance',
        features: JSON.stringify([
          'Everything in Starter Plan PLUS:',
          'Priority name reservation (1–2 days)',
          'DSC issued in 3–4 days',
          'SPICe+ Form Filing – 5–7 days',
          'Incorporation Certificate – 7–14 days',
          'Appointment of Auditor',
          'Issuance of Share Certificates',
          'INC-20A Form Filing',
          'DIR-3 KYC (for 2 directors)',
          'Accounting & Bookkeeping (up to 100 transactions)',
          'Financial Statement Preparation',
          'Free Accounting Software (1-year license)',
          'AOC-4, MGT-7 & ADT-1 Filing',
          'Annual Filing (Turnover up to ₹20 Lakhs)',
          'Facilitation of Annual General Meeting',
          'PF & ESI Compliance Assistance',
          'One Year Income Tax Filing (Turnover up to ₹20 Lakhs)',
          '30-Minute Consultation with Senior CA/CS for Business Planning',
          '6 Months Free Legal Consultation',
          'Special Discount on Startup Package'
        ]),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ];

    await queryInterface.bulkInsert('Packages', opcPackages, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the new packages
    await queryInterface.bulkDelete('Packages', {
      id: {
        [Sequelize.Op.in]: ['b5f1c3e0-1234-4567-8901-000000000017', 'b5f1c3e0-1234-4567-8901-000000000018']
      }
    }, {});

    // Restore the old package
    await queryInterface.bulkInsert('Packages', [{
      id: 'b5f1c3e0-1234-4567-8901-000000000003',
      name: 'One Person Company (OPC) Registration',
      price: 3999.00,
      duration: 365,
      description: 'OPC registration for single entrepreneurs with limited liability',
      features: JSON.stringify([
        'Company name reservation',
        'DIN for Director',
        'Digital Signature Certificate',
        'Incorporation Certificate',
        'Memorandum & Articles of Association',
        'PAN & TAN registration',
        'Nominee appointment assistance'
      ]),
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  }
};