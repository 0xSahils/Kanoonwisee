const sequelize = require('./src/config/database');
const { QueryTypes } = require('sequelize');

async function testColumn() {
  try {
    const result = await sequelize.query('SELECT COUNT(*) as count FROM "LawyerProfiles" WHERE approved = \'pending\'', { type: QueryTypes.SELECT });
    console.log('Query successful, pending lawyers:', result[0].count);
  } catch (error) {
    console.error('Query error:', error);
  } finally {
    await sequelize.close();
  }
}

testColumn();
