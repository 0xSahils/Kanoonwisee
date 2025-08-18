"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const lawyersData = [
      // Mumbai Lawyers
      {
        email: "rajesh.criminal.mumbai@kanoonwise.com",
        full_name: "Adv. Rajesh Malhotra",
        bar_registration_number: "MH2024001",
        specialization: ["Criminal Law", "POCSO Cases"],
        court_practice: ["High Court", "Sessions Court"],
        fee_structure: { consultation: 2500, court: 15000 },
        years_experience: 15,
        languages: ["Hindi", "English", "Marathi"],
        city: "Mumbai",
        consultation_type: "both",
      },
      {
        email: "priya.corporate.mumbai@kanoonwise.com",
        full_name: "Adv. Priya Nair",
        bar_registration_number: "MH2024002",
        specialization: ["Corporate Law", "Mergers & Acquisitions"],
        court_practice: ["High Court", "Supreme Court"],
        fee_structure: { consultation: 3500, court: 25000 },
        years_experience: 12,
        languages: ["Hindi", "English", "Marathi"],
        city: "Mumbai",
        consultation_type: "both",
      },
      {
        email: "vikram.property.mumbai@kanoonwise.com",
        full_name: "Adv. Vikram Joshi",
        bar_registration_number: "MH2024003",
        specialization: ["Property Law", "Real Estate"],
        court_practice: ["District Court", "Civil Court"],
        fee_structure: { consultation: 2000, court: 12000 },
        years_experience: 8,
        languages: ["Hindi", "English", "Marathi"],
        city: "Mumbai",
        consultation_type: "online",
      },

      // Delhi Lawyers
      {
        email: "adv.sunita.delhi@example.com",
        full_name: "Adv. Sunita Reddy",
        bar_registration_number: "DL001234",
        specialization: ["Family Law", "Women Rights"],
        court_practice: ["High Court", "Family Court"],
        fee_structure: { consultation: 3000, court: 18000 },
        years_experience: 18,
        languages: ["Hindi", "English"],
        city: "Delhi",
        consultation_type: "both",
      },
      {
        email: "adv.amit.delhi@example.com",
        full_name: "Adv. Amit Gupta",
        bar_registration_number: "DL001235",
        specialization: ["Criminal Law", "Cyber Law"],
        court_practice: ["High Court", "Sessions Court"],
        fee_structure: { consultation: 4000, court: 22000 },
        years_experience: 14,
        languages: ["Hindi", "English"],
        city: "Delhi",
        consultation_type: "both",
      },
      {
        email: "adv.kavita.delhi@example.com",
        full_name: "Adv. Kavita Jain",
        bar_registration_number: "DL001236",
        specialization: ["Corporate Law", "Contract Law"],
        court_practice: ["High Court", "Supreme Court"],
        fee_structure: { consultation: 5000, court: 30000 },
        years_experience: 20,
        languages: ["Hindi", "English"],
        city: "Delhi",
        consultation_type: "offline",
      },

      // Bangalore Lawyers
      {
        email: "adv.suresh.bangalore@example.com",
        full_name: "Adv. Suresh Patel",
        bar_registration_number: "KA001234",
        specialization: ["Property Law", "Civil Law"],
        court_practice: ["High Court", "District Court"],
        fee_structure: { consultation: 2200, court: 14000 },
        years_experience: 11,
        languages: ["English", "Kannada", "Hindi"],
        city: "Bangalore",
        consultation_type: "both",
      },
      {
        email: "adv.meera.bangalore@example.com",
        full_name: "Adv. Meera Reddy",
        bar_registration_number: "KA001235",
        specialization: ["IT Law", "Intellectual Property"],
        court_practice: ["High Court", "Commercial Court"],
        fee_structure: { consultation: 4500, court: 28000 },
        years_experience: 9,
        languages: ["English", "Kannada", "Telugu"],
        city: "Bangalore",
        consultation_type: "online",
      },
      {
        email: "adv.ravi.bangalore@example.com",
        full_name: "Adv. Ravi Kumar",
        bar_registration_number: "KA001236",
        specialization: ["Employment Law", "Labor Law"],
        court_practice: ["High Court", "Labor Court"],
        fee_structure: { consultation: 1800, court: 10000 },
        years_experience: 7,
        languages: ["English", "Kannada", "Tamil"],
        city: "Bangalore",
        consultation_type: "both",
      },

      // Hyderabad Lawyers
      {
        email: "adv.lakshmi.hyderabad@example.com",
        full_name: "Adv. Lakshmi Devi",
        bar_registration_number: "TS001234",
        specialization: ["Family Law", "Matrimonial Law"],
        court_practice: ["High Court", "Family Court"],
        fee_structure: { consultation: 2800, court: 16000 },
        years_experience: 13,
        languages: ["Telugu", "English", "Hindi"],
        city: "Hyderabad",
        consultation_type: "both",
      },
      {
        email: "adv.krishna.hyderabad@example.com",
        full_name: "Adv. Krishna Murthy",
        bar_registration_number: "TS001235",
        specialization: ["Real Estate Law", "Property Law"],
        court_practice: ["High Court", "Revenue Court"],
        fee_structure: { consultation: 3200, court: 20000 },
        years_experience: 16,
        languages: ["Telugu", "English"],
        city: "Hyderabad",
        consultation_type: "offline",
      },

      // Pune Lawyers
      {
        email: "adv.ganesh.pune@example.com",
        full_name: "Adv. Ganesh Patil",
        bar_registration_number: "MH002234",
        specialization: ["Criminal Law", "Consumer Law"],
        court_practice: ["District Court", "Sessions Court"],
        fee_structure: { consultation: 1500, court: 8000 },
        years_experience: 6,
        languages: ["Marathi", "Hindi", "English"],
        city: "Pune",
        consultation_type: "both",
      },
      {
        email: "adv.anita.pune@example.com",
        full_name: "Adv. Anita Desai",
        bar_registration_number: "MH002235",
        specialization: ["Corporate Law", "Banking Law"],
        court_practice: ["High Court", "Commercial Court"],
        fee_structure: { consultation: 2700, court: 17000 },
        years_experience: 10,
        languages: ["Marathi", "English", "Hindi"],
        city: "Pune",
        consultation_type: "online",
      },

      // Ahmedabad Lawyers
      {
        email: "adv.hardik.ahmedabad@example.com",
        full_name: "Adv. Hardik Shah",
        bar_registration_number: "GJ001234",
        specialization: ["Tax Law", "GST Law"],
        court_practice: ["High Court", "Tribunal"],
        fee_structure: { consultation: 2400, court: 15000 },
        years_experience: 12,
        languages: ["Gujarati", "Hindi", "English"],
        city: "Ahmedabad",
        consultation_type: "both",
      },
      {
        email: "adv.nisha.ahmedabad@example.com",
        full_name: "Adv. Nisha Patel",
        bar_registration_number: "GJ001235",
        specialization: ["Family Law", "Civil Law"],
        court_practice: ["District Court", "Family Court"],
        fee_structure: { consultation: 1800, court: 11000 },
        years_experience: 8,
        languages: ["Gujarati", "Hindi", "English"],
        city: "Ahmedabad",
        consultation_type: "both",
      },

      // Kolkata Lawyers
      {
        email: "adv.subrata.kolkata@example.com",
        full_name: "Adv. Subrata Banerjee",
        bar_registration_number: "WB001234",
        specialization: ["Constitutional Law", "Public Interest"],
        court_practice: ["High Court", "Supreme Court"],
        fee_structure: { consultation: 3500, court: 25000 },
        years_experience: 22,
        languages: ["Bengali", "English", "Hindi"],
        city: "Kolkata",
        consultation_type: "offline",
      },
      {
        email: "adv.ruma.kolkata@example.com",
        full_name: "Adv. Ruma Das",
        bar_registration_number: "WB001235",
        specialization: ["Women Rights", "Criminal Law"],
        court_practice: ["High Court", "Sessions Court"],
        fee_structure: { consultation: 2200, court: 13000 },
        years_experience: 9,
        languages: ["Bengali", "English", "Hindi"],
        city: "Kolkata",
        consultation_type: "both",
      },

      // Jaipur Lawyers
      {
        email: "adv.mahesh.jaipur@example.com",
        full_name: "Adv. Mahesh Sharma",
        bar_registration_number: "RJ001234",
        specialization: ["Property Law", "Revenue Law"],
        court_practice: ["High Court", "Revenue Court"],
        fee_structure: { consultation: 2000, court: 12000 },
        years_experience: 14,
        languages: ["Hindi", "English"],
        city: "Jaipur",
        consultation_type: "both",
      },
      {
        email: "adv.pooja.jaipur@example.com",
        full_name: "Adv. Pooja Agarwal",
        bar_registration_number: "RJ001235",
        specialization: ["Family Law", "Divorce Law"],
        court_practice: ["District Court", "Family Court"],
        fee_structure: { consultation: 1600, court: 9000 },
        years_experience: 5,
        languages: ["Hindi", "English"],
        city: "Jaipur",
        consultation_type: "online",
      },
    ];

    // Insert users and lawyer profiles
    for (const lawyer of lawyersData) {
      const userId = uuidv4();
      const profileId = uuidv4();

      // Insert user
      await queryInterface.bulkInsert(
        "Users",
        [
          {
            id: userId,
            email: lawyer.email,
            role: "lawyer",
            created_at: new Date(),
          },
        ],
        {}
      );

      // Insert lawyer profile
      await queryInterface.bulkInsert(
        "LawyerProfiles",
        [
          {
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
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    const emails = [
      "adv.rajesh.mumbai@example.com",
      "adv.priya.mumbai@example.com",
      "adv.vikram.mumbai@example.com",
      "adv.sunita.delhi@example.com",
      "adv.amit.delhi@example.com",
      "adv.kavita.delhi@example.com",
      "adv.suresh.bangalore@example.com",
      "adv.meera.bangalore@example.com",
      "adv.ravi.bangalore@example.com",
      "adv.lakshmi.hyderabad@example.com",
      "adv.krishna.hyderabad@example.com",
      "adv.ganesh.pune@example.com",
      "adv.anita.pune@example.com",
      "adv.hardik.ahmedabad@example.com",
      "adv.nisha.ahmedabad@example.com",
      "adv.subrata.kolkata@example.com",
      "adv.ruma.kolkata@example.com",
      "adv.mahesh.jaipur@example.com",
      "adv.pooja.jaipur@example.com",
    ];

    await queryInterface.bulkDelete(
      "LawyerProfiles",
      {
        user_id: {
          [Sequelize.Op.in]: Sequelize.literal(
            `(SELECT id FROM "Users" WHERE email IN (${emails
              .map((e) => `'${e}'`)
              .join(",")}))`
          ),
        },
      },
      {}
    );

    await queryInterface.bulkDelete(
      "Users",
      {
        email: { [Sequelize.Op.in]: emails },
      },
      {}
    );
  },
};
