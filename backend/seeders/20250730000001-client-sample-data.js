'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const clientUserId = uuidv4();
    const clientProfileId = uuidv4();
    const lawyerProfileId = '93632838-674b-4976-87c9-8d6aa8df0095'; // Use existing lawyer profile

    // Create a client user
    await queryInterface.bulkInsert('Users', [{
      id: clientUserId,
      email: 'client@example.com',
      role: 'client',
      created_at: new Date(),
    }], {});

    // Create client profile
    await queryInterface.bulkInsert('ClientProfiles', [{
      id: clientProfileId,
      user_id: clientUserId,
      full_name: 'Jane Doe',
      phone: '+91-9876543210',
      city: 'Mumbai',
      preferred_consultation_type: 'online',
      created_at: new Date(),
    }], {});

    // Create some sample appointments with client_id
    await queryInterface.bulkInsert('Appointments', [{
      id: uuidv4(),
      lawyer_id: lawyerProfileId,
      client_id: clientProfileId,
      client_name: 'Jane Doe',
      consultation_type: 'online',
      status: 'completed',
      scheduled_time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      fee: 5000,
      case_description: 'Need advice on property dispute resolution',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: uuidv4(),
      lawyer_id: lawyerProfileId,
      client_id: clientProfileId,
      client_name: 'Jane Doe',
      consultation_type: 'offline',
      status: 'pending',
      scheduled_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      fee: 15000,
      case_description: 'Family law consultation needed',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});

    // Create sample review
    await queryInterface.bulkInsert('Reviews', [{
      id: uuidv4(),
      lawyer_id: lawyerProfileId,
      client_id: clientProfileId,
      rating: 5,
      review_text: 'Excellent lawyer! Very professional and knowledgeable. Helped me resolve my property dispute efficiently.',
      created_at: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews', null, {});
    await queryInterface.bulkDelete('Appointments', { case_description: { [Sequelize.Op.ne]: null } }, {});
    await queryInterface.bulkDelete('ClientProfiles', null, {});
    await queryInterface.bulkDelete('Users', { role: 'client' }, {});
  }
};
