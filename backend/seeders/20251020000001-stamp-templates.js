'use strict';

module.exports = {
  up: async (queryInterface) => {
    const documentTypes = [
      'Affidavit',
      'Agreement',
      'Power of Attorney',
      'Lease Agreement',
      'Sale Deed',
      'Partnership Deed',
      'Memorandum of Understanding (MOU)',
      'Rental Agreement',
      'Gift Deed',
      'Indemnity Bond',
      'Declaration',
      'Employment Contract',
      'Non-Disclosure Agreement (NDA)',
      'Loan Agreement',
      'Trust Deed',
    ];

    const indianStates = [
      'ANDHRA PRADESH',
      'ARUNACHAL PRADESH',
      'ASSAM',
      'BIHAR',
      'CHHATTISGARH',
      'GOA',
      'GUJARAT',
      'HARYANA',
      'HIMACHAL PRADESH',
      'JHARKHAND',
      'KARNATAKA',
      'KERALA',
      'MADHYA PRADESH',
      'MAHARASHTRA',
      'MANIPUR',
      'MEGHALAYA',
      'MIZORAM',
      'NAGALAND',
      'ODISHA',
      'PUNJAB',
      'RAJASTHAN',
      'SIKKIM',
      'TAMIL NADU',
      'TELANGANA',
      'TRIPURA',
      'UTTAR PRADESH',
      'UTTARAKHAND',
      'WEST BENGAL',
      'DELHI',
    ];

    const templates = [];

    // Create templates for each state and document type
    indianStates.forEach((state) => {
      documentTypes.forEach((docType) => {
        templates.push({
          id: require('crypto').randomUUID(),
          state,
          documentType: docType,
          basePrice: 10100, // ₹101 default
          convenienceFee: 7697, // ₹76.97 after discount
          description: `Non-judicial stamp paper for ${docType} in ${state}`,
          metadata: JSON.stringify({
            originalConvenienceFee: 9197, // ₹91.97 before discount
            platformDiscount: 1500, // ₹15 automatic discount
          }),
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    });

    await queryInterface.bulkInsert('StampTemplates', templates);

    // Create sample promo codes
    const promoCodes = [
      {
        id: require('crypto').randomUUID(),
        code: 'SUPER',
        discountType: 'fixed',
        discountValue: 1500, // ₹15 off
        maxDiscount: null,
        minOrderAmount: 10000, // ₹100 minimum
        validFrom: new Date('2025-01-01'),
        validUntil: new Date('2025-12-31'),
        usageLimit: 1000,
        usageCount: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: require('crypto').randomUUID(),
        code: 'WELCOME10',
        discountType: 'percentage',
        discountValue: 10, // 10% off
        maxDiscount: 5000, // Max ₹50 discount
        minOrderAmount: 15000, // ₹150 minimum
        validFrom: new Date('2025-01-01'),
        validUntil: new Date('2025-12-31'),
        usageLimit: 500,
        usageCount: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: require('crypto').randomUUID(),
        code: 'FESTIVE20',
        discountType: 'percentage',
        discountValue: 20, // 20% off
        maxDiscount: 10000, // Max ₹100 discount
        minOrderAmount: 20000, // ₹200 minimum
        validFrom: new Date('2025-10-01'),
        validUntil: new Date('2025-11-30'),
        usageLimit: 100,
        usageCount: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('StampPromoCodes', promoCodes);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('StampPromoCodes', null, {});
    await queryInterface.bulkDelete('StampTemplates', null, {});
  },
};
