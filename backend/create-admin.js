const sequelize = require('./src/config/database');
const { QueryTypes } = require('sequelize');

async function createAdmin() {
  try {
    await sequelize.query(`
      INSERT INTO "Users" (id, email, role, created_at)
      VALUES (gen_random_uuid(), 'admin@kanoonwise.com', 'admin', NOW())
      ON CONFLICT (email) DO NOTHING
    `, { type: QueryTypes.INSERT });
    console.log('Admin user created or already exists');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await sequelize.close();
  }
}

createAdmin();
