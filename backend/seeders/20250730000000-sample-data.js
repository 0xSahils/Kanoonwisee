'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const lawyerUserId = uuidv4();
    const lawyerProfileId = uuidv4();

    await queryInterface.bulkInsert('Users', [{
      id: lawyerUserId,
      email: 'lawyer@example.com',
      role: 'lawyer',
      created_at: new Date(),
    }], {});

    await queryInterface.bulkInsert('LawyerProfiles', [{
      id: lawyerProfileId,
      user_id: lawyerUserId,
      full_name: 'John Doe',
      bar_registration_number: 'BAR12345',
      specialization: ['Criminal Law', 'Family Law'],
      court_practice: ['High Court', 'Supreme Court'],
      fee_structure: JSON.stringify({ consultation: 5000, court: 20000 }),
      years_experience: 10,
      languages: ['English', 'Hindi'],
      city: 'Delhi',
      consultation_type: 'both',
      created_at: new Date(),
    }], {});

    await queryInterface.bulkInsert('Appointments', [{
      id: uuidv4(),
      lawyer_id: lawyerProfileId,
      client_name: 'Jane Smith',
      consultation_type: 'online',
      status: 'pending',
      scheduled_time: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      fee: 5000,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Appointments', null, {});
    await queryInterface.bulkDelete('LawyerProfiles', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
