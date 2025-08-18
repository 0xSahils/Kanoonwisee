'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const lawyersData = [
      // Mumbai Lawyers
      {
        email: 'rajesh.criminal.mumbai@kanoonwise.com',
        full_name: 'Adv. Rajesh Malhotra',
        bar_registration_number: 'MH2024001',
        specialization: ['Criminal Law', 'POCSO Cases'],
        court_practice: ['High Court', 'Sessions Court'],
        fee_structure: { consultation: 2500, court: 15000 },
        years_experience: 15,
        languages: ['Hindi', 'English', 'Marathi'],
        city: 'Mumbai',
        consultation_type: 'both'
      },
      {
        email: 'priya.corporate.mumbai@kanoonwise.com',
        full_name: 'Adv. Priya Nair',
        bar_registration_number: 'MH2024002',
        specialization: ['Corporate Law', 'Mergers & Acquisitions'],
        court_practice: ['High Court', 'Supreme Court'],
        fee_structure: { consultation: 3500, court: 25000 },
        years_experience: 12,
        languages: ['Hindi', 'English', 'Marathi'],
        city: 'Mumbai',
        consultation_type: 'both'
      },
      {
        email: 'vikram.property.mumbai@kanoonwise.com',
        full_name: 'Adv. Vikram Joshi',
        bar_registration_number: 'MH2024003',
        specialization: ['Property Law', 'Real Estate'],
        court_practice: ['District Court', 'Civil Court'],
        fee_structure: { consultation: 2000, court: 12000 },
        years_experience: 8,
        languages: ['Hindi', 'English', 'Marathi'],
        city: 'Mumbai',
        consultation_type: 'online'
      },

      // Delhi Lawyers
      {
        email: 'sunita.family.delhi@kanoonwise.com',
        full_name: 'Adv. Sunita Kapoor',
        bar_registration_number: 'DL2024001',
        specialization: ['Family Law', 'Women Rights'],
        court_practice: ['High Court', 'Family Court'],
        fee_structure: { consultation: 3000, court: 18000 },
        years_experience: 18,
        languages: ['Hindi', 'English'],
        city: 'Delhi',
        consultation_type: 'both'
      },
      {
        email: 'amit.cyber.delhi@kanoonwise.com',
        full_name: 'Adv. Amit Verma',
        bar_registration_number: 'DL2024002',
        specialization: ['Criminal Law', 'Cyber Law'],
        court_practice: ['High Court', 'Sessions Court'],
        fee_structure: { consultation: 4000, court: 22000 },
        years_experience: 14,
        languages: ['Hindi', 'English'],
        city: 'Delhi',
        consultation_type: 'both'
      },
      {
        email: 'kavita.corporate.delhi@kanoonwise.com',
        full_name: 'Adv. Kavita Agarwal',
        bar_registration_number: 'DL2024003',
        specialization: ['Corporate Law', 'Contract Law'],
        court_practice: ['High Court', 'Supreme Court'],
        fee_structure: { consultation: 5000, court: 30000 },
        years_experience: 20,
        languages: ['Hindi', 'English'],
        city: 'Delhi',
        consultation_type: 'offline'
      },

      // Bangalore Lawyers
      {
        email: 'suresh.property.bangalore@kanoonwise.com',
        full_name: 'Adv. Suresh Rao',
        bar_registration_number: 'KA2024001',
        specialization: ['Property Law', 'Civil Law'],
        court_practice: ['High Court', 'District Court'],
        fee_structure: { consultation: 2200, court: 14000 },
        years_experience: 11,
        languages: ['English', 'Kannada', 'Hindi'],
        city: 'Bangalore',
        consultation_type: 'both'
      },
      {
        email: 'meera.it.bangalore@kanoonwise.com',
        full_name: 'Adv. Meera Shetty',
        bar_registration_number: 'KA2024002',
        specialization: ['IT Law', 'Intellectual Property'],
        court_practice: ['High Court', 'Commercial Court'],
        fee_structure: { consultation: 4500, court: 28000 },
        years_experience: 9,
        languages: ['English', 'Kannada', 'Telugu'],
        city: 'Bangalore',
        consultation_type: 'online'
      },
      {
        email: 'ravi.employment.bangalore@kanoonwise.com',
        full_name: 'Adv. Ravi Krishnan',
        bar_registration_number: 'KA2024003',
        specialization: ['Employment Law', 'Labor Law'],
        court_practice: ['High Court', 'Labor Court'],
        fee_structure: { consultation: 1800, court: 10000 },
        years_experience: 7,
        languages: ['English', 'Kannada', 'Tamil'],
        city: 'Bangalore',
        consultation_type: 'both'
      },

      // Hyderabad Lawyers
      {
        email: 'lakshmi.family.hyderabad@kanoonwise.com',
        full_name: 'Adv. Lakshmi Prasad',
        bar_registration_number: 'TS2024001',
        specialization: ['Family Law', 'Matrimonial Law'],
        court_practice: ['High Court', 'Family Court'],
        fee_structure: { consultation: 2800, court: 16000 },
        years_experience: 13,
        languages: ['Telugu', 'English', 'Hindi'],
        city: 'Hyderabad',
        consultation_type: 'both'
      },
      {
        email: 'krishna.realestate.hyderabad@kanoonwise.com',
        full_name: 'Adv. Krishna Reddy',
        bar_registration_number: 'TS2024002',
        specialization: ['Real Estate Law', 'Property Law'],
        court_practice: ['High Court', 'Revenue Court'],
        fee_structure: { consultation: 3200, court: 20000 },
        years_experience: 16,
        languages: ['Telugu', 'English'],
        city: 'Hyderabad',
        consultation_type: 'offline'
      },

      // Pune Lawyers
      {
        email: 'ganesh.criminal.pune@kanoonwise.com',
        full_name: 'Adv. Ganesh Kulkarni',
        bar_registration_number: 'MH2024101',
        specialization: ['Criminal Law', 'Consumer Law'],
        court_practice: ['District Court', 'Sessions Court'],
        fee_structure: { consultation: 1500, court: 8000 },
        years_experience: 6,
        languages: ['Marathi', 'Hindi', 'English'],
        city: 'Pune',
        consultation_type: 'both'
      },
      {
        email: 'anita.banking.pune@kanoonwise.com',
        full_name: 'Adv. Anita Bhosale',
        bar_registration_number: 'MH2024102',
        specialization: ['Corporate Law', 'Banking Law'],
        court_practice: ['High Court', 'Commercial Court'],
        fee_structure: { consultation: 2700, court: 17000 },
        years_experience: 10,
        languages: ['Marathi', 'English', 'Hindi'],
        city: 'Pune',
        consultation_type: 'online'
      },

      // Ahmedabad Lawyers
      {
        email: 'hardik.tax.ahmedabad@kanoonwise.com',
        full_name: 'Adv. Hardik Mehta',
        bar_registration_number: 'GJ2024001',
        specialization: ['Tax Law', 'GST Law'],
        court_practice: ['High Court', 'Tribunal'],
        fee_structure: { consultation: 2400, court: 15000 },
        years_experience: 12,
        languages: ['Gujarati', 'Hindi', 'English'],
        city: 'Ahmedabad',
        consultation_type: 'both'
      },
      {
        email: 'nisha.family.ahmedabad@kanoonwise.com',
        full_name: 'Adv. Nisha Shah',
        bar_registration_number: 'GJ2024002',
        specialization: ['Family Law', 'Civil Law'],
        court_practice: ['District Court', 'Family Court'],
        fee_structure: { consultation: 1800, court: 11000 },
        years_experience: 8,
        languages: ['Gujarati', 'Hindi', 'English'],
        city: 'Ahmedabad',
        consultation_type: 'both'
      },

      // Kolkata Lawyers
      {
        email: 'subrata.constitutional.kolkata@kanoonwise.com',
        full_name: 'Adv. Subrata Ghosh',
        bar_registration_number: 'WB2024001',
        specialization: ['Constitutional Law', 'Public Interest'],
        court_practice: ['High Court', 'Supreme Court'],
        fee_structure: { consultation: 3500, court: 25000 },
        years_experience: 22,
        languages: ['Bengali', 'English', 'Hindi'],
        city: 'Kolkata',
        consultation_type: 'offline'
      },
      {
        email: 'ruma.women.kolkata@kanoonwise.com',
        full_name: 'Adv. Ruma Chatterjee',
        bar_registration_number: 'WB2024002',
        specialization: ['Women Rights', 'Criminal Law'],
        court_practice: ['High Court', 'Sessions Court'],
        fee_structure: { consultation: 2200, court: 13000 },
        years_experience: 9,
        languages: ['Bengali', 'English', 'Hindi'],
        city: 'Kolkata',
        consultation_type: 'both'
      },

      // Jaipur Lawyers
      {
        email: 'mahesh.property.jaipur@kanoonwise.com',
        full_name: 'Adv. Mahesh Gupta',
        bar_registration_number: 'RJ2024001',
        specialization: ['Property Law', 'Revenue Law'],
        court_practice: ['High Court', 'Revenue Court'],
        fee_structure: { consultation: 2000, court: 12000 },
        years_experience: 14,
        languages: ['Hindi', 'English'],
        city: 'Jaipur',
        consultation_type: 'both'
      },
      {
        email: 'pooja.divorce.jaipur@kanoonwise.com',
        full_name: 'Adv. Pooja Sharma',
        bar_registration_number: 'RJ2024002',
        specialization: ['Family Law', 'Divorce Law'],
        court_practice: ['District Court', 'Family Court'],
        fee_structure: { consultation: 1600, court: 9000 },
        years_experience: 5,
        languages: ['Hindi', 'English'],
        city: 'Jaipur',
        consultation_type: 'online'
      },

      // Lucknow Lawyers
      {
        email: 'ramesh.civil.lucknow@kanoonwise.com',
        full_name: 'Adv. Ramesh Tiwari',
        bar_registration_number: 'UP2024001',
        specialization: ['Civil Law', 'Service Law'],
        court_practice: ['High Court', 'District Court'],
        fee_structure: { consultation: 1400, court: 7000 },
        years_experience: 11,
        languages: ['Hindi', 'English'],
        city: 'Lucknow',
        consultation_type: 'both'
      },
      {
        email: 'sita.consumer.lucknow@kanoonwise.com',
        full_name: 'Adv. Sita Mishra',
        bar_registration_number: 'UP2024002',
        specialization: ['Consumer Law', 'Banking Law'],
        court_practice: ['Consumer Court', 'District Court'],
        fee_structure: { consultation: 1200, court: 6000 },
        years_experience: 6,
        languages: ['Hindi', 'English'],
        city: 'Lucknow',
        consultation_type: 'online'
      }
    ];

    // Insert users and lawyer profiles
    for (const lawyer of lawyersData) {
      const userId = uuidv4();
      const profileId = uuidv4();

      // Insert user
      await queryInterface.bulkInsert('Users', [{
        id: userId,
        email: lawyer.email,
        role: 'lawyer',
        created_at: new Date(),
      }], {});

      // Insert lawyer profile
      await queryInterface.bulkInsert('LawyerProfiles', [{
        id: profileId,
        user_id: userId,
        full_name: lawyer.full_name,
        bar_registration_number: lawyer.bar_registration_number,
        specialization: lawyer.specialization,
        court_practice: lawyer.court_practice,
        fee_structure: JSON.stringify(lawyer.fee_structure),
        years_experience: lawyer.years_experience,
        languages: lawyer.languages,
        city: lawyer.city,
        consultation_type: lawyer.consultation_type,
        created_at: new Date(),
      }], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    const emails = [
      'rajesh.criminal.mumbai@kanoonwise.com', 'priya.corporate.mumbai@kanoonwise.com', 'vikram.property.mumbai@kanoonwise.com',
      'sunita.family.delhi@kanoonwise.com', 'amit.cyber.delhi@kanoonwise.com', 'kavita.corporate.delhi@kanoonwise.com',
      'suresh.property.bangalore@kanoonwise.com', 'meera.it.bangalore@kanoonwise.com', 'ravi.employment.bangalore@kanoonwise.com',
      'lakshmi.family.hyderabad@kanoonwise.com', 'krishna.realestate.hyderabad@kanoonwise.com',
      'ganesh.criminal.pune@kanoonwise.com', 'anita.banking.pune@kanoonwise.com',
      'hardik.tax.ahmedabad@kanoonwise.com', 'nisha.family.ahmedabad@kanoonwise.com',
      'subrata.constitutional.kolkata@kanoonwise.com', 'ruma.women.kolkata@kanoonwise.com',
      'mahesh.property.jaipur@kanoonwise.com', 'pooja.divorce.jaipur@kanoonwise.com',
      'ramesh.civil.lucknow@kanoonwise.com', 'sita.consumer.lucknow@kanoonwise.com'
    ];

    await queryInterface.bulkDelete('LawyerProfiles', {
      user_id: {
        [Sequelize.Op.in]: Sequelize.literal(`(SELECT id FROM "Users" WHERE email IN (${emails.map(e => `'${e}'`).join(',')}))`)
      }
    }, {});

    await queryInterface.bulkDelete('Users', {
      email: { [Sequelize.Op.in]: emails }
    }, {});
  }
};
