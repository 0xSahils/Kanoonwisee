const sequelize = require('./src/config/database');

async function testDatabase() {
  try {
    console.log('🔗 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection successful');
    
    console.log('🔍 Testing LawyerProfiles table...');
    const result = await sequelize.query('SELECT COUNT(*) FROM "LawyerProfiles"', { 
      type: sequelize.QueryTypes.SELECT 
    });
    console.log('✅ LawyerProfiles table accessible, count:', result[0].count);
    
    console.log('🔍 Testing basic select query...');
    const lawyers = await sequelize.query('SELECT id FROM "LawyerProfiles" LIMIT 1', {
      type: sequelize.QueryTypes.SELECT
    });
    console.log('✅ Basic select query successful, found:', lawyers.length, 'lawyer(s)');
    
    await sequelize.close();
    console.log('✅ Test completed successfully');
  } catch (error) {
    console.error('❌ Database error:', error.message);
    console.error('❌ Full error:', error);
  }
}

testDatabase();
