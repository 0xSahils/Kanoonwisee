const { Sequelize } = require("sequelize");

// Load dotenv only in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Try multiple possible environment variable names
const databaseUrl = process.env.DB_URL || 
                   process.env.DATABASE_URL || 
                   process.env.POSTGRES_URL ||
                   process.env.POSTGRESQL_URL;

// Validate required environment variable
if (!databaseUrl) {
  console.error("❌ Database URL environment variable is not set");
  console.error("Tried: DB_URL, DATABASE_URL, POSTGRES_URL, POSTGRESQL_URL");
  console.error("Available environment variables:", 
    Object.keys(process.env)
      .filter(key => key.includes('DB') || key.includes('DATABASE') || key.includes('POSTGRES'))
      .map(key => `${key}: ${process.env[key] ? 'SET' : 'NOT SET'}`)
  );
  throw new Error("Database URL environment variable is required");
}

console.log("🔗 Connecting to database...");
console.log("Database URL available:", !!databaseUrl);

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
