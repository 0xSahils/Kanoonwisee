require("dotenv").config();
const axios = require('axios');
const sequelize = require("./src/config/database");
const User = require("./src/models/user.model");
const LawyerProfile = require("./src/models/lawyerProfile.model");
const jwt = require('jsonwebtoken');

const API_BASE = 'http://localhost:3000/api';

async function testLawyerProfileAPI() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    // Find a lawyer user to test with
    const testUser = await User.findOne({
      where: { email: "test@gmail.com", role: "lawyer" },
    });
    
    if (!testUser) {
      console.log("❌ No lawyer user found for testing");
      return;
    }

    console.log("✅ Found test lawyer user:", testUser.email);

    // Generate a test JWT token
    const token = jwt.sign(
      { id: testUser.id, email: testUser.email, role: testUser.role },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );

    const authHeaders = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    console.log("\n🧪 Testing GET /api/lawyer/profile");
    try {
      const getResponse = await axios.get(`${API_BASE}/lawyer/profile`, {
        headers: authHeaders
      });
      console.log("✅ GET Profile successful");
      console.log("Current profile:", JSON.stringify(getResponse.data, null, 2));
    } catch (error) {
      console.log("ℹ️ No existing profile found (expected for new user)");
    }

    console.log("\n🧪 Testing PUT /api/lawyer/profile with new fields");
    const profileData = {
      full_name: "Test Lawyer API",
      bar_registration_number: "API_TEST_12345",
      specialization: ["Criminal Law", "Family Law"],
      court_practice: ["High Court", "Supreme Court"],
      fee_structure: { 
        consultation: 1500, 
        court: 7500 
      },
      years_experience: 8,
      languages: ["English", "Hindi", "Marathi"],
      city: "Mumbai",
      consultation_type: "both",
      // New fields we added
      photo: "https://example.com/lawyer-photo.jpg",
      cv: "https://example.com/lawyer-cv.pdf",
      bar_registration_file: "https://example.com/bar-registration.pdf",
      state: "Maharashtra",
      secondary_specialization: ["Corporate Law", "Intellectual Property", "Tax Law"]
    };

    try {
      const putResponse = await axios.put(`${API_BASE}/lawyer/profile`, profileData, {
        headers: authHeaders
      });
      console.log("✅ PUT Profile successful");
      console.log("Updated profile:", JSON.stringify(putResponse.data, null, 2));
    } catch (error) {
      console.log("❌ PUT Profile failed:");
      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Error:", error.response.data);
      } else {
        console.log("Error:", error.message);
      }
    }

    console.log("\n🧪 Testing GET /api/lawyer/profile again");
    try {
      const getResponse2 = await axios.get(`${API_BASE}/lawyer/profile`, {
        headers: authHeaders
      });
      console.log("✅ GET Profile after update successful");
      console.log("Final profile:", JSON.stringify(getResponse2.data, null, 2));
      
      // Check if all new fields are present
      const profile = getResponse2.data;
      console.log("\n🔍 Verifying new fields:");
      console.log("Photo:", profile.photo ? "✅" : "❌");
      console.log("CV:", profile.cv ? "✅" : "❌");
      console.log("Bar Registration File:", profile.bar_registration_file ? "✅" : "❌");
      console.log("State:", profile.state ? "✅" : "❌");
      console.log("Secondary Specialization:", profile.secondary_specialization ? "✅" : "❌");
      
    } catch (error) {
      console.log("❌ GET Profile after update failed:");
      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Error:", error.response.data);
      } else {
        console.log("Error:", error.message);
      }
    }

    await sequelize.close();
    console.log("\n🎉 API testing completed");
    
  } catch (error) {
    console.error("❌ Test error:", error.message);
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  await sequelize.close();
  process.exit(0);
});

testLawyerProfileAPI();
