'use strict';

/**
 * Migration: Delete all stamp templates
 * 
 * This migration removes all existing stamp templates from the database.
 * Templates should be managed by admin through the admin panel.
 * 
 * Admin can add templates via: POST /api/admin/stamps/stamp-templates
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log('🗑️  Deleting all stamp templates...');
      
      // Count templates before deletion
      const [countBefore] = await queryInterface.sequelize.query(
        'SELECT COUNT(*) as count FROM "StampTemplates"'
      );
      
      const totalBefore = countBefore[0].count;
      console.log(`   Found ${totalBefore} templates to delete`);
      
      if (totalBefore === 0) {
        console.log('   ✅ No templates to delete');
        return;
      }
      
      // Delete all stamp templates
      await queryInterface.sequelize.query(
        'DELETE FROM "StampTemplates"'
      );
      
      // Verify deletion
      const [countAfter] = await queryInterface.sequelize.query(
        'SELECT COUNT(*) as count FROM "StampTemplates"'
      );
      
      console.log(`   ✅ Deleted ${totalBefore} templates`);
      console.log(`   Templates remaining: ${countAfter[0].count}`);
      console.log('   📝 Admin can now add templates via admin panel');
      
    } catch (error) {
      console.error('   ⚠️  Error deleting stamp templates:', error.message);
      // Don't fail the migration - just log the error
    }
  },

  down: async (queryInterface, Sequelize) => {
    // No rollback - templates should be re-added by admin
    console.log('⚠️  Rollback not supported for stamp template deletion');
    console.log('   Templates should be added by admin via admin panel');
  }
};
