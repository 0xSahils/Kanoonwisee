#!/usr/bin/env node

/**
 * Insert Business Service Packages
 *
 * This script inserts all business service packages into the database
 * with upsert functionality to handle existing records.
 */

const sequelize = require('./src/config/database');
const { Package } = require('./src/models');

const businessServices = [
  // Company Registration Services
  {
    id: 'b5f1c3e0-1234-4567-8901-000000000001',
    name: 'Private Limited Company Registration',
    price: 6999.00,
    duration: 365, // 1 year service validity
    description: 'Complete private limited company registration with all legal documentation and compliance',
    features: JSON.stringify([
      'Company name reservation and approval',
      'DIN for Directors',
      'Digital Signature Certificate (DSC)',
      'Incorporation Certificate',
      'Company PAN & TAN',
      'Free legal consultation for 6 months',
      'Annual filing assistance',
      'Dedicated compliance support'
    ]),
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'b5f1c3e0-1234-4567-8901-000000000002',
    name: 'LLP Registration',
    price: 4999.00,
    duration: 365,
    description: 'Limited Liability Partnership registration with complete documentation',
    features: JSON.stringify([
      'LLP name approval',
      'DPIN for Partners',
      'Digital Signature Certificate',
      'Certificate of Incorporation',
      'LLP Agreement drafting',
      'PAN & TAN registration',
      'Free consultation for 3 months'
    ]),
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'b5f1c3e0-1234-4567-8901-000000000003',
    name: 'One Person Company (OPC) Registration',
    price: 3999.00,
    duration: 365,
    description: 'OPC registration for single entrepreneurs with limited liability',
    features: JSON.stringify([
      'Company name reservation',
      'DIN for Director',
      'Digital Signature Certificate',
      'Incorporation Certificate',
      'Memorandum & Articles of Association',
      'PAN & TAN registration',
      'Nominee appointment assistance'
    ]),
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'b5f1c3e0-1234-4567-8901-000000000004',
    name: 'Sole Proprietorship Registration',
    price: 1999.00,
    duration: 365,
    description: 'Simple business registration for individual entrepreneurs',
    features: JSON.stringify([
      'Business name registration',
      'Shop & Establishment license',
      'GST registration assistance',
      'Business bank account support',
      'Legal documentation',
      'Compliance guidance'
    ]),
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'b5f1c3e0-1234-4567-8901-000000000005',
    name: 'Partnership Firm Registration',
    price: 2999.00,
    duration: 365,
    description: 'Partnership firm registration with comprehensive documentation',
    features: JSON.stringify([
      'Partnership deed drafting',
      'Firm name registration',
      'PAN registration',
      'GST registration support',
      'Bank account opening support',
      'Legal compliance guidance'
    ]),
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'b5f1c3e0-1234-4567-8901-000000000006',
    name: 'Nidhi Company Registration',
    price: 15999.00,
    duration: 365,
    description: 'Specialized Nidhi company registration for financial services',
    features: JSON.stringify([
      'Nidhi company incorporation',
      'RBI compliance documentation',
      'Articles of Association drafting',
      'Minimum capital compliance',
      'Regulatory approvals',
      'Ongoing compliance support'
    ]),
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },

  // Trademark & IP Services
  {
    id: 'b5f1c3e0-1234-4567-8901-000000000007',
    name: 'Trademark Registration',
    price: 1199.00,
    duration: 180, // 6 months processing
    description: 'Complete trademark registration and protection',
    features: JSON.stringify([
      'Trademark search and analysis',
      'Application filing',
      'Examination response',
      'Publication monitoring',
      'Registration certificate',
      'Legal protection advice'
    ]),
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'b5f1c3e0-1234-4567-8901-000000000008',
    name: 'Patent Services',
    price: 12999.00,
    duration: 730, // 2 years processing
    description: 'Patent filing and prosecution services',
    features: JSON.stringify([
      'Patent search and analysis',
      'Patent application drafting',
      'Filing with patent office',
      'Examination response handling',
      'Patent prosecution',
      'Grant assistance'
    ]),
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'b5f1c3e0-1234-4567-8901-000000000009',
    name: 'Copyright Registration',
    price: 2499.00,
    duration: 365,
    description: 'Copyright protection for creative works',
    features: JSON.stringify([
      'Copyright application filing',
      'Documentation preparation',
      'Registration certificate',
      'Legal protection guidance',
      'Infringement consultation'
    ]),
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'b5f1c3e0-1234-4567-8901-000000000010',
    name: 'Design Registration',
    price: 1999.00,
    duration: 365,
    description: 'Industrial design registration and protection',
    features: JSON.stringify([
      'Design search and analysis',
      'Application preparation',
      'Filing with design office',
      'Examination support',
      'Registration certificate',
      'Protection guidance'
    ]),
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },

  // Compliance Services
  {
    id: 'b5f1c3e0-1234-4567-8901-000000000014',
    name: 'GST Compliance',
    price: 14999.00,
    duration: 365,
    description: 'Complete GST registration and annual filing services',
    features: JSON.stringify([
      'GST registration assistance',
      'Monthly/quarterly GST return filing',
      'GSTR-1, GSTR-3B, and GSTR-9 filing',
      'Input tax credit reconciliation',
      'GST compliance audit',
      'Penalty protection guarantee',
      'Expert GST consultation',
      'Annual compliance reporting'
    ]),
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'b5f1c3e0-1234-4567-8901-000000000015',
    name: 'Labour Law Compliance',
    price: 3499.00,
    duration: 365,
    description: 'Complete PF and ESI compliance management',
    features: JSON.stringify([
      'PF & ESI registration',
      'Monthly contribution calculation',
      'Monthly return filing',
      'Employee onboarding/offboarding',
      'Compliance calendar management',
      'Timely filing guarantee',
      'Penalty protection',
      'Expert HR compliance support'
    ]),
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'b5f1c3e0-1234-4567-8901-000000000016',
    name: 'POSH Compliance',
    price: 14999.00,
    duration: 365,
    description: 'Complete POSH Act compliance implementation',
    features: JSON.stringify([
      'Custom POSH policy drafting',
      'Internal Committee constitution',
      'Employee awareness training',
      'IC member specialized training',
      'Annual report filing assistance',
      'Compliance documentation',
      'Legal consultation',
      'Ongoing compliance support'
    ]),
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'b5f1c3e0-1234-4567-8901-000000000012',
    name: 'Virtual Legal Officer',
    price: 9999.00,
    duration: 365,
    description: 'Dedicated legal officer for ongoing business compliance',
    features: JSON.stringify([
      'Dedicated legal officer assignment',
      'Monthly compliance review',
      'Legal document drafting',
      'Contract review and assistance',
      'Regulatory updates and alerts',
      'Priority legal consultation',
      'Business structuring advice',
      'Dispute resolution support'
    ]),
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'b5f1c3e0-1234-4567-8901-000000000013',
    name: 'Compliance Package',
    price: 4999.00,
    duration: 365,
    description: 'Annual compliance management package',
    features: JSON.stringify([
      'Annual ROC filings',
      'Board meeting compliance',
      'Statutory registers maintenance',
      'Compliance calendar',
      'Regular compliance audits',
      'Penalty protection',
      'Expert consultation'
    ]),
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  }
];

async function insertBusinessPackages() {
  try {
    console.log('🔄 Inserting business service packages...');

    // Use upsert to handle existing records
    const results = await Package.bulkCreate(businessServices, {
      updateOnDuplicate: ['name', 'price', 'duration', 'description', 'features', 'is_active', 'updated_at']
    });

    console.log(`✅ Successfully inserted/updated ${results.length} business service packages`);

    // Verify the packages
    const count = await Package.count({
      where: {
        id: {
          [require('sequelize').Op.like]: 'b5f1c3e0%'
        }
      }
    });

    console.log(`📊 Total business service packages in database: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to insert business packages:', error);
    process.exit(1);
  }
}

insertBusinessPackages();