#!/usr/bin/env node

/**
 * Production Environment Database Verification Script
 * This script verifies all expected columns exist in the LawyerProfiles table
 * and tests the exact query that's failing in production
 */

require("dotenv").config();
const sequelize = require("./src/config/database");
const LawyerProfile = require("./src/models/lawyerProfile.model");
const User = require("./src/models/user.model");
const { Op } = require("sequelize");

async function verifyProductionDatabase() {
  try {
    console.log('🔗 Connecting to production database...');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Database URL provided:', !!process.env.DB_URL);
    
    await sequelize.authenticate();
    console.log('✅ Database connection successful');
    
    // Check table structure
    console.log('\n🔍 Verifying LawyerProfiles table structure...');
    const tableInfo = await sequelize.getQueryInterface().describeTable('LawyerProfiles');
    
    const requiredColumns = [
      'id', 'user_id', 'full_name', 'bar_registration_number',
      'specialization', 'court_practice', 'fee_structure', 'years_experience',
      'languages', 'city', 'consultation_type', 'photo', 'cv', 
      'bar_registration_file', 'state', 'secondary_specialization', 'approved', 'created_at'
    ];
    
    console.log('Existing columns:', Object.keys(tableInfo));
    
    const missingColumns = requiredColumns.filter(col => !tableInfo[col]);
    if (missingColumns.length > 0) {
      console.error('❌ Missing columns:', missingColumns);
      return;
    } else {
      console.log('✅ All required columns exist');
    }
    
    // Test the exact query from clientService.js
    console.log('\n🔍 Testing the exact failing query...');
    
    const whereClause = {};
    const limit = 10;
    const offset = 0;
    
    const lawyers = await LawyerProfile.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ],
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });
    
    console.log('✅ Query successful! Found', lawyers.count, 'lawyers');
    
    // Test with complex where clause like in the original error
    console.log('\n🔍 Testing with complex where clause...');
    const complexWhere = {
      [Op.and]: [
        { approved: 'approved' }
      ]
    };
    
    const complexResult = await LawyerProfile.findAndCountAll({
      where: complexWhere,
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ],
      limit: 5,
      offset: 0,
      order: [["created_at", "DESC"]],
    });
    
    console.log('✅ Complex query successful! Found', complexResult.count, 'approved lawyers');
    
    await sequelize.close();
    console.log('\n✅ All verifications passed! Database is correctly configured.');
    
  } catch (error) {
    console.error('\n❌ Verification failed:');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    
    if (error.name === 'SequelizeDatabaseError') {
      console.error('\n💡 This appears to be a database schema issue.');
      console.error('💡 Try running: node fix-production-db.js');
    }
  }
}

verifyProductionDatabase();
