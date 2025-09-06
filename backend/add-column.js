const sequelize = require('./src/config/database');

async function addColumn() {
  try {
    await sequelize.query(`
      ALTER TABLE "LawyerProfiles" 
      ADD COLUMN "approved" VARCHAR(20) NOT NULL DEFAULT 'pending' 
      CHECK ("approved" IN ('pending', 'approved', 'canceled'))
    `, { raw: true });
    console.log('Column added successfully');
  } catch (error) {
    console.error('Error adding column:', error);
  } finally {
    await sequelize.close();
  }
}

addColumn();
