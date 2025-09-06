const sequelize = require('./src/config/database');
const { QueryTypes } = require('sequelize');

async function checkAdmin() {
  try {
    const result = await sequelize.query('SELECT email, role FROM "Users" WHERE email = \'admin@kanoonwise.com\'', { type: QueryTypes.SELECT });
    console.log('Admin user:', result);
  } catch (error) {
    console.error('Query error:', error);
  } finally {
    await sequelize.close();
  }
}

checkAdmin();
