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

    // State-specific pricing based on requirements
    // Convenience fee structure:
    // - Under ₹1000 stamp: Flat ₹60
    // - Above ₹1000 stamp: 15% of stamp value
    // - Home delivery: Flat ₹120 (checkbox option)
    // - Express delivery: ₹100 (checkbox option)

    const stateConfigs = {
      'HARYANA': {
        minStamp: 10100, // ₹101 (minimum 101 to 1 lacs)
        maxStamp: 10000000, // ₹1 lac
        convenienceFeeFlat: 6000, // ₹60 for under ₹1000
      },
      'DELHI': {
        minStamp: 1000, // ₹10 (minimum 10rs to 500rs)
        maxStamp: 50000, // ₹500
        convenienceFeeFlat: 6000, // ₹60 for under ₹1000
      },
      'GUJARAT': {
        minStamp: 30000, // ₹300 (only 300rs stamp)
        maxStamp: 30000, // ₹300 (fixed)
        convenienceFeeFlat: 6000, // ₹60 for under ₹1000
      },
      'UTTAR PRADESH': {
        minStamp: 1000, // ₹10 (minimum 10rs to 500rs)
        maxStamp: 50000, // ₹500
        convenienceFeeFlat: 6000, // ₹60 for under ₹1000
      },
      'TAMIL NADU': {
        minStamp: 2000, // ₹20 (minimum 20rs to 10 lacs)
        maxStamp: 1000000, // ₹10 lacs
        convenienceFeeFlat: 6000, // ₹60 for under ₹1000
      },
    };

    const templates = [];

    // Create templates only for the 5 available states
    Object.keys(stateConfigs).forEach((state) => {
      const config = stateConfigs[state];
      documentTypes.forEach((docType) => {
        templates.push({
          id: require('crypto').randomUUID(),
          state,
          documentType: docType,
          basePrice: config.minStamp, // Set minimum as base price
          convenienceFee: config.convenienceFeeFlat, // ₹60 flat for under ₹1000
          description: `Non-judicial stamp paper for ${docType} in ${state}`,
          metadata: JSON.stringify({
            minStamp: config.minStamp,
            maxStamp: config.maxStamp,
            convenienceFeeFlat: config.convenienceFeeFlat, // ₹60 for under ₹1000
            convenienceFeePercent: 15, // 15% for above ₹1000
            homeDeliveryCharge: 12000, // ₹120 flat
            expressDeliveryCharge: 10000, // ₹100 flat
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
