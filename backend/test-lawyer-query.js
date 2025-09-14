const sequelize = require('./src/config/database');
const LawyerProfile = require('./src/models/lawyerProfile.model');
const User = require('./src/models/user.model');

async function testLawyerQuery() {
  try {
    console.log('🔗 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection successful');
    
    console.log('🔍 Testing LawyerProfile model...');
    const count = await LawyerProfile.count();
    console.log('✅ LawyerProfile count query successful, count:', count);
    
    console.log('🔍 Testing LawyerProfile findAll with basic query...');
    const lawyers = await LawyerProfile.findAll({ 
      limit: 1,
      attributes: ['id', 'full_name']
    });
    console.log('✅ Basic findAll successful, found:', lawyers.length, 'lawyer(s)');
    
    console.log('🔍 Testing LawyerProfile findAndCountAll...');
    const result = await LawyerProfile.findAndCountAll({
      limit: 1,
      offset: 0,
      order: [["created_at", "DESC"]],
    });
    console.log('✅ findAndCountAll successful, count:', result.count, 'rows:', result.rows.length);
    
    console.log('🔍 Testing LawyerProfile with User include...');
    const lawyersWithUser = await LawyerProfile.findAndCountAll({
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ],
      limit: 1,
      offset: 0,
      order: [["created_at", "DESC"]],
    });
    console.log('✅ findAndCountAll with User include successful, count:', lawyersWithUser.count);
    
    await sequelize.close();
    console.log('✅ All tests completed successfully');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('❌ Stack:', error.stack);
  }
}

testLawyerQuery();
