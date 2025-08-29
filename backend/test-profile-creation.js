require("dotenv").config();
const sequelize = require("./src/config/database");
const User = require("./src/models/user.model");
const LawyerProfile = require("./src/models/lawyerProfile.model");

async function testProfileCreation() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    // Find test user - using existing user from database
    const testUser = await User.findOne({
      where: { email: "lawyer@example.com" }, // This user exists in our database
    });
    if (!testUser) {
      console.log("Test user not found");
      return;
    }

    console.log("Found test user:", testUser.id);

    // Check if profile already exists
    let existingProfile = await LawyerProfile.findOne({
      where: { user_id: testUser.id },
    });
    if (existingProfile) {
      console.log("Profile already exists, deleting it first...");
      await existingProfile.destroy();
    }

    // Try to create minimal profile
    console.log("Creating minimal profile...");
    try {
      const minimalProfile = await LawyerProfile.create({
        user_id: testUser.id,
        full_name: "Test Lawyer",
        bar_registration_number: "BAR12345",
      });
      console.log(
        "✅ Minimal profile created successfully:",
        minimalProfile.id
      );
    } catch (error) {
      console.log("❌ Failed to create minimal profile:", error.message);
    }

    // Try to create full profile
    console.log("\nCreating full profile...");
    try {
      // Delete previous attempt
      await LawyerProfile.destroy({ where: { user_id: testUser.id } });

      const fullProfile = await LawyerProfile.create({
        user_id: testUser.id,
        full_name: "Test Lawyer Full",
        bar_registration_number: "BAR54321",
        specialization: ["Criminal Law", "Family Law"],
        court_practice: ["High Court"],
        fee_structure: { consultation: 1000, court: 5000 },
        years_experience: 5,
        languages: ["English", "Hindi"],
        city: "Mumbai",
        consultation_type: "both",
        photo: "https://example.com/photo.jpg",
        cv: "https://example.com/cv.pdf",
        bar_registration_file: "https://example.com/bar-registration.pdf",
        state: "Maharashtra",
        secondary_specialization: ["Corporate Law", "Intellectual Property"],
      });
      console.log("✅ Full profile created successfully:", fullProfile.id);
    } catch (error) {
      console.log("❌ Failed to create full profile:", error.message);
      console.log("Error details:", error);
    }

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

testProfileCreation();
