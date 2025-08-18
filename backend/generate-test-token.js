require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("./src/models/user.model");
const sequelize = require("./src/config/database");

async function generateTestToken() {
  try {
    await sequelize.authenticate();

    // Create or find test user
    let testUser = await User.findOne({
      where: { email: "testlawyer@test.com" },
    });
    if (!testUser) {
      testUser = await User.create({
        email: "testlawyer@test.com",
        role: "lawyer",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: testUser.id,
        email: testUser.email,
        role: testUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log("Test User Created:");
    console.log("Email:", testUser.email);
    console.log("Role:", testUser.role);
    console.log("User ID:", testUser.id);
    console.log("\nGenerated JWT Token:");
    console.log(token);

    // Test the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("\nToken Verification:", decoded);

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

generateTestToken();
