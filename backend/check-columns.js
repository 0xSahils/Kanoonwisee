const sequelize = require('./src/config/database');

async function checkSchema() {
  try {
    console.log('🔍 Checking LawyerProfiles table column types...');
    
    const [results] = await sequelize.query(`
      SELECT column_name, data_type, character_maximum_length 
      FROM information_schema.columns 
      WHERE table_name = 'LawyerProfiles' 
      AND column_name IN ('photo', 'cv', 'bar_registration_file')
      ORDER BY column_name;
    `);
    
    console.log('📋 Column types:');
    results.forEach(row => {
      console.log(`  ${row.column_name}: ${row.data_type} ${row.character_maximum_length ? `(${row.character_maximum_length})` : '(unlimited)'}`);
    });
    
    await sequelize.close();
    process.exit(0);
  } catch(error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkSchema();
