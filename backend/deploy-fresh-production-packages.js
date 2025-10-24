#!/usr/bin/env node

/**
 * Fresh Production Deployment Script - Packages & Stamps
 *
 * This script creates all required packages and stamp templates for the KanoonWise platform in production.
 * It handles the complete ecosystem with proper pricing and features.
 *
 * Features:
 * - Comprehensive package creation for all 14 service categories
 * - 435 stamp templates (15 document types × 29 Indian states)
 * - 3 promotional codes for stamp services
 * - UUID generation for all records
 * - Proper feature formatting for database storage
 * - Upsert operation (update if exists, insert if new)
 * - Production environment validation
 * - Comprehensive logging and verification
 *
 * Deploys:
 * - 40+ service packages across 14 categories
 * - 435 stamp templates covering all states and document types
 * - 3 promo codes (SUPER, WELCOME10, FESTIVE20)
 *
 * Usage: NODE_ENV=production node deploy-fresh-production-packages.js
 */

require('dotenv').config();

const { v4: uuidv4 } = require('uuid');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`📋 Step ${step}: ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// Complete package definitions for all service categories
const allPackages = [
  // 1. Private Limited Company Registration
  {
    id: uuidv4(),
    name: 'Starter Plan',
    price: 1199,
    duration: 15,
    description: 'Essential Private Limited Company incorporation with basic compliance',
    features: [
      'Company Name Reservation (RUN)',
      'Digital Signature Certificate (DSC)',
      'Director Identification Number (DIN)',
      'SPICe+ Form Filing',
      'Incorporation Certificate',
      'PAN & TAN Application',
      'Basic Compliance Guide',
      'Email Support'
    ],
    is_active: true,
    category: 'Private Limited Company Registration'
  },
  {
    id: uuidv4(),
    name: 'Pro Plan',
    price: 3999,
    duration: 10,
    description: 'Fast Track Private Limited Company setup with startup benefits',
    features: [
      'Everything in Starter Plan PLUS:',
      'Priority company name filing (1-2 days)',
      'Faster DSC processing (3-4 days)',
      'Priority SPICe+ filing',
      'Bank account opening assistance',
      'Current account opening support',
      'GST registration assistance',
      'Share certificate issuance',
      '3 months free legal consultation'
    ],
    is_active: true,
    category: 'Private Limited Company Registration'
  },

  // 2. OPC Registration
  {
    id: uuidv4(),
    name: 'OPC Starter Plan',
    price: 1799,
    duration: 15,
    description: 'Complete One Person Company registration with essential services',
    features: [
      'OPC Name Reservation',
      'Digital Signature Certificate',
      'Director Identification Number',
      'SPICe+ Form Filing for OPC',
      'Incorporation Certificate',
      'Nominee Appointment',
      'Basic Compliance Kit',
      'Email & Phone Support'
    ],
    is_active: true,
    category: 'OPC Registration'
  },
  {
    id: uuidv4(),
    name: 'OPC Premium Plan',
    price: 29999,
    duration: 10,
    description: 'Premium OPC setup with annual compliance and complete support',
    features: [
      'Everything in Starter Plan PLUS:',
      'Priority name reservation (1-2 days)',
      'DSC issued in 3-4 days',
      'Annual compliance support',
      'Accounting & bookkeeping (100 transactions)',
      'Financial statement preparation',
      'AOC-4, MGT-7 filing',
      'One year income tax filing',
      'GST registration assistance',
      'Dedicated account manager'
    ],
    is_active: true,
    category: 'OPC Registration'
  },

  // 3. Sole Proprietorship Registration
  {
    id: uuidv4(),
    name: 'Sole Proprietorship Starter Plan',
    price: 2999,
    duration: 7,
    description: 'Basic sole proprietorship registration with essential documentation',
    features: [
      'Business Name Registration',
      'MSME/Udyam Registration',
      'PAN Card Application',
      'Current Account Opening Support',
      'Basic Business Kit',
      'Compliance Calendar',
      'Email Support'
    ],
    is_active: true,
    category: 'Sole Proprietorship Registration'
  },
  {
    id: uuidv4(),
    name: 'Sole Proprietorship Premium Plan',
    price: 9912,
    duration: 5,
    description: 'Complete sole proprietorship setup with licenses and compliance',
    features: [
      'Everything in Starter Plan PLUS:',
      'Trade License Application',
      'Shop & Establishment License',
      'GST Registration',
      'Professional Tax Registration',
      'Bank Account Opening Assistance',
      'Basic Accounting Setup',
      'Legal Document Templates',
      '6 months consultation support'
    ],
    is_active: true,
    category: 'Sole Proprietorship Registration'
  },

  // 4. Partnership Firm Registration
  {
    id: uuidv4(),
    name: 'Partnership Starter Plan',
    price: 2999,
    duration: 10,
    description: 'Essential partnership firm registration with basic compliance',
    features: [
      'Partnership Deed Drafting',
      'Firm Name Registration',
      'PAN Application for Firm',
      'Bank Account Opening Support',
      'MSME Registration',
      'Basic Compliance Guide',
      'Email Support'
    ],
    is_active: true,
    category: 'Partnership Firm Registration'
  },
  {
    id: uuidv4(),
    name: 'Partnership Premium Plan',
    price: 5999,
    duration: 7,
    description: 'Complete partnership setup with licenses and registrations',
    features: [
      'Everything in Starter Plan PLUS:',
      'Trade License Application',
      'Shop & Establishment License',
      'GST Registration',
      'Professional Tax Registration',
      'TAN Application',
      'Current Account Opening',
      'Partnership Agreement Review',
      '3 months legal consultation'
    ],
    is_active: true,
    category: 'Partnership Firm Registration'
  },

  // 5. Trademark Services
  {
    id: uuidv4(),
    name: 'Brand Starter',
    price: 7999,
    duration: 30,
    description: 'Essential trademark registration with basic protection',
    features: [
      'Trademark Search Report',
      'Application Filing (1 Class)',
      'Response to Examination Report',
      'Publication Monitoring',
      'Registration Certificate',
      'Basic Brand Protection Guide',
      'Email Updates'
    ],
    is_active: true,
    category: 'Trademark Registration'
  },
  {
    id: uuidv4(),
    name: 'Business Shield',
    price: 12999,
    duration: 25,
    description: 'Enhanced trademark protection with multiple class coverage',
    features: [
      'Everything in Brand Starter PLUS:',
      'Multi-class application (up to 3 classes)',
      'Comprehensive search in 45 classes',
      'Opposition handling (if any)',
      'Fast-track processing',
      'Brand monitoring for 1 year',
      'Legal consultation support',
      'Priority customer support'
    ],
    is_active: true,
    category: 'Trademark Registration'
  },
  {
    id: uuidv4(),
    name: 'Enterprise Guard',
    price: 24999,
    duration: 20,
    description: 'Complete trademark portfolio management for enterprises',
    features: [
      'Everything in Business Shield PLUS:',
      'Multi-class application (up to 10 classes)',
      'International trademark consultation',
      'Madrid Protocol guidance',
      'Brand portfolio review',
      'Infringement monitoring',
      'Legal action support',
      'Dedicated IP attorney',
      '2 years post-registration support'
    ],
    is_active: true,
    category: 'Trademark Registration'
  },

  // 6. Patent Services
  {
    id: uuidv4(),
    name: 'Provisional Patent Filing',
    price: 19999,
    duration: 15,
    description: 'Quick patent protection with provisional filing',
    features: [
      'Invention Disclosure Review',
      'Prior Art Search',
      'Provisional Patent Drafting',
      'Patent Application Filing',
      '12 months protection period',
      'Filing Receipt & Number',
      'Basic Patent Consultation',
      'Email Support'
    ],
    is_active: true,
    category: 'Patent Services'
  },
  {
    id: uuidv4(),
    name: 'Complete Patent Prosecution',
    price: 74999,
    duration: 60,
    description: 'Full patent prosecution from filing to grant',
    features: [
      'Everything in Provisional Filing PLUS:',
      'Complete patent specification',
      'PCT International filing option',
      'Examination response handling',
      'Patent prosecution till grant',
      'Patent agent consultation',
      'Multiple revision rounds',
      'Grant certificate processing',
      'Post-grant maintenance support'
    ],
    is_active: true,
    category: 'Patent Services'
  },

  // 7. Copyright Services
  {
    id: uuidv4(),
    name: 'Creator Basic',
    price: 4999,
    duration: 21,
    description: 'Essential copyright registration for individual creators',
    features: [
      'Copyright Application Filing',
      'Work Classification & Description',
      'Copyright Certificate',
      'Basic IP Protection Guide',
      'Email Support',
      'Filing Status Updates'
    ],
    is_active: true,
    category: 'Copyright Registration'
  },
  {
    id: uuidv4(),
    name: 'Professional Shield',
    price: 9999,
    duration: 15,
    description: 'Enhanced copyright protection for professionals',
    features: [
      'Everything in Creator Basic PLUS:',
      'Multiple work registration (up to 3)',
      'Fast-track processing',
      'Copyright infringement guidance',
      'Legal consultation (1 hour)',
      'Priority support',
      'DMCA takedown assistance'
    ],
    is_active: true,
    category: 'Copyright Registration'
  },
  {
    id: uuidv4(),
    name: 'Enterprise Vault',
    price: 19999,
    duration: 10,
    description: 'Comprehensive copyright portfolio for enterprises',
    features: [
      'Everything in Professional Shield PLUS:',
      'Bulk copyright registration (up to 10 works)',
      'Copyright portfolio management',
      'Infringement monitoring',
      'Legal action support',
      'Dedicated IP consultant',
      'Annual compliance review',
      'International copyright guidance'
    ],
    is_active: true,
    category: 'Copyright Registration'
  },

  // 8. Design Registration
  {
    id: uuidv4(),
    name: 'Design Basic',
    price: 9999,
    duration: 30,
    description: 'Essential design registration for product protection',
    features: [
      'Design Search & Analysis',
      'Design Application Filing',
      'Technical Drawing Review',
      'Registration Certificate',
      'Basic Design Protection Guide',
      'Email Support'
    ],
    is_active: true,
    category: 'Design Registration'
  },
  {
    id: uuidv4(),
    name: 'Design Professional',
    price: 19999,
    duration: 25,
    description: 'Enhanced design protection with multiple designs',
    features: [
      'Everything in Design Basic PLUS:',
      'Multiple design registration (up to 3)',
      'Priority examination request',
      'Design portfolio consultation',
      'Infringement guidance',
      'Legal consultation support',
      'Fast-track processing'
    ],
    is_active: true,
    category: 'Design Registration'
  },
  {
    id: uuidv4(),
    name: 'Design Enterprise',
    price: 34999,
    duration: 20,
    description: 'Complete design portfolio management for enterprises',
    features: [
      'Everything in Design Professional PLUS:',
      'Bulk design registration (up to 10)',
      'International design consultation',
      'Hague Agreement guidance',
      'Design portfolio strategy',
      'Infringement monitoring',
      'Legal action support',
      'Dedicated design attorney'
    ],
    is_active: true,
    category: 'Design Registration'
  },

  // 9. Virtual Legal Officer
  {
    id: uuidv4(),
    name: 'VLO Advisory Plan',
    price: 14999,
    duration: 30,
    description: 'Monthly legal advisory services with dedicated support',
    features: [
      'Dedicated Legal Officer',
      'Monthly Legal Consultation (2 hours)',
      'Contract Review & Drafting',
      'Compliance Calendar Management',
      'Legal Document Templates',
      'Email & Phone Support',
      'Monthly Compliance Report'
    ],
    is_active: true,
    category: 'Virtual Legal Officer'
  },
  {
    id: uuidv4(),
    name: 'VLO Growth Plan',
    price: 39999,
    duration: 30,
    description: 'Comprehensive legal support for growing businesses',
    features: [
      'Everything in Advisory Plan PLUS:',
      'Weekly Legal Consultation (4 hours/month)',
      'Board Meeting Support',
      'Investment Documentation',
      'Employment Contract Drafting',
      'IP Portfolio Management',
      'Litigation Support',
      'Priority Legal Emergency Support',
      'Quarterly Business Review'
    ],
    is_active: true,
    category: 'Virtual Legal Officer'
  },

  // 10. Labour Law Compliance
  {
    id: uuidv4(),
    name: 'Starter Team',
    price: 3499,
    duration: 30,
    description: 'Essential labour law compliance for small teams',
    features: [
      'Labour License Registration',
      'PF & ESI Registration',
      'Employment Contract Templates',
      'Attendance & Leave Policy',
      'Basic HR Compliance Kit',
      'Monthly Compliance Calendar',
      'Email Support'
    ],
    is_active: true,
    category: 'Labour Law Compliance'
  },
  {
    id: uuidv4(),
    name: 'Growth Team',
    price: 6999,
    duration: 30,
    description: 'Comprehensive labour law compliance for growing teams',
    features: [
      'Everything in Starter Team PLUS:',
      'POSH Policy Implementation',
      'Gratuity & Bonus Compliance',
      'Contract Labour License',
      'Factory License (if applicable)',
      'Annual Labour Law Audit',
      'HR Policy Documentation',
      'Legal Consultation Support',
      'Compliance Training Session'
    ],
    is_active: true,
    category: 'Labour Law Compliance'
  },

  // 11. GST Compliance
  {
    id: uuidv4(),
    name: 'GST Registration',
    price: 2499,
    duration: 7,
    description: 'Quick GST registration with basic compliance setup',
    features: [
      'GST Registration Application',
      'GSTIN Certificate',
      'GST Compliance Calendar',
      'Basic GST Training',
      'Return Filing Schedule',
      'Email Support'
    ],
    is_active: true,
    category: 'GST Compliance'
  },
  {
    id: uuidv4(),
    name: 'GST Filing - Standard',
    price: 19999,
    duration: 365,
    description: 'Annual GST filing support with standard features',
    features: [
      'Monthly GSTR-1 Filing',
      'Monthly GSTR-3B Filing',
      'Annual GSTR-9 Filing',
      'Basic Reconciliation',
      'GST Notice Handling',
      'Compliance Calendar',
      'Email & Phone Support',
      'Quarterly Review Calls'
    ],
    is_active: true,
    category: 'GST Compliance'
  },
  {
    id: uuidv4(),
    name: 'GST Filing - Pro',
    price: 24999,
    duration: 365,
    description: 'Premium GST compliance with advanced features',
    features: [
      'Everything in Standard Plan PLUS:',
      'Advanced Reconciliation',
      'Input Tax Credit Optimization',
      'GST Audit Support',
      'Notice & Assessment Handling',
      'Refund Processing Support',
      'Dedicated GST Consultant',
      'Monthly Compliance Report',
      'On-site Visit (if required)'
    ],
    is_active: true,
    category: 'GST Compliance'
  },

  // 12. Accounting Tax Services
  {
    id: uuidv4(),
    name: 'Startup Plan',
    price: 4999,
    duration: 30,
    description: 'Essential accounting and tax services for startups',
    features: [
      'Monthly Bookkeeping (50 transactions)',
      'Financial Statement Preparation',
      'Basic Tax Planning',
      'GST Return Filing',
      'Income Tax Return Filing',
      'Accounting Software Setup',
      'Email Support'
    ],
    is_active: true,
    category: 'Accounting Tax Services'
  },
  {
    id: uuidv4(),
    name: 'Growth Plan',
    price: 9999,
    duration: 30,
    description: 'Comprehensive accounting support for growing businesses',
    features: [
      'Monthly Bookkeeping (200 transactions)',
      'Advanced Financial Reporting',
      'Tax Planning & Advisory',
      'Multi-location GST Filing',
      'TDS Return Filing',
      'Management Reporting',
      'Dedicated Accountant',
      'Phone & Email Support',
      'Monthly Review Meeting'
    ],
    is_active: true,
    category: 'Accounting Tax Services'
  },

  // 13. LLP Annual Compliance
  {
    id: uuidv4(),
    name: 'LLP Filing Essentials',
    price: 9999,
    duration: 365,
    description: 'LLPs that maintain their own financial statements and just need expert filing',
    features: [
      'Penalty Protection Guarantee',
      'Filing of Form 11 (Annual Return)',
      'Filing of Form 8 (Statement of Account & Solvency)',
      'Designated Partner KYC',
      'Annual compliance calendar',
      'Expert review and filing',
      'Email support'
    ],
    is_active: true,
    category: 'LLP Annual Compliance'
  },
  {
    id: uuidv4(),
    name: 'LLP Compliance Retainer',
    price: 19999,
    duration: 365,
    description: 'LLPs wanting a complete, end-to-end solution for their annual compliance',
    features: [
      'Penalty Protection Guarantee',
      'Filing of Form 11 (Annual Return)',
      'Filing of Form 8 (Statement of Account & Solvency)',
      'Designated Partner KYC',
      'Preparation of LLP Financial Statements',
      'Annual Income Tax Filing for the LLP',
      'Monthly compliance monitoring',
      'Dedicated compliance manager',
      'Priority support'
    ],
    is_active: true,
    category: 'LLP Annual Compliance'
  },

  // 14. Startup Legal Kit
  {
    id: uuidv4(),
    name: 'Essential Kit',
    price: 24999,
    duration: 21,
    description: 'Getting your company incorporated and establishing a professional identity',
    features: [
      'Company Incorporation (Private Limited)',
      'Business Name Registration',
      'Digital Signature Certificate',
      'Director Identification Number',
      'PAN & TAN Application',
      'Bank Account Opening Assistance',
      'Basic Legal Document Templates',
      'Compliance Calendar Setup',
      'Email & Phone Support'
    ],
    is_active: true,
    category: 'Startup Legal Kit'
  },
  {
    id: uuidv4(),
    name: 'Growth Kit',
    price: 59999,
    duration: 28,
    description: 'Protecting your brand and launching your online presence as you go to market',
    features: [
      'Everything in Essential Kit PLUS:',
      'Trademark Registration (1 Class)',
      'Website Terms & Conditions',
      'Privacy Policy Drafting',
      'Employment Agreement Templates',
      'Founder Agreement Documentation',
      'IP Assignment Agreements',
      'GST Registration',
      'Professional Tax Registration',
      'Brand Protection Consultation'
    ],
    is_active: true,
    category: 'Startup Legal Kit'
  },
  {
    id: uuidv4(),
    name: 'Scale-Up Kit',
    price: 99999,
    duration: 42,
    description: 'Securing all assets and preparing for your first hires, funding, and full market launch',
    features: [
      'Everything in Growth Kit PLUS:',
      'Multi-class Trademark Protection (up to 3)',
      'Copyright Registration for Content',
      'Investment Documentation Templates',
      'Share Subscription Agreements',
      'Employee Stock Option Plan (ESOP)',
      'Shareholder Agreement',
      'Board Resolution Templates',
      'Compliance Audit & Review',
      'Legal Due Diligence Support',
      'Funding Round Documentation',
      'Dedicated Legal Consultant'
    ],
    is_active: true,
    category: 'Startup Legal Kit'
  }
];

// Stamp Templates Data
const documentTypes = [
  'Affidavit',
  'Agreement',
  'Power of Attorney',
  'Lease Agreement',
  'Sale Deed',
  'Partnership Deed',
  'Memorandum of Understanding (MOU)',
  'Rental Agreement',
  'Gift Deed',
  'Indemnity Bond',
  'Declaration',
  'Employment Contract',
  'Non-Disclosure Agreement (NDA)',
  'Loan Agreement',
  'Trust Deed',
];

const indianStates = [
  'ANDHRA PRADESH',
  'ARUNACHAL PRADESH',
  'ASSAM',
  'BIHAR',
  'CHHATTISGARH',
  'GOA',
  'GUJARAT',
  'HARYANA',
  'HIMACHAL PRADESH',
  'JHARKHAND',
  'KARNATAKA',
  'KERALA',
  'MADHYA PRADESH',
  'MAHARASHTRA',
  'MANIPUR',
  'MEGHALAYA',
  'MIZORAM',
  'NAGALAND',
  'ODISHA',
  'PUNJAB',
  'RAJASTHAN',
  'SIKKIM',
  'TAMIL NADU',
  'TELANGANA',
  'TRIPURA',
  'UTTAR PRADESH',
  'UTTARAKHAND',
  'WEST BENGAL',
  'DELHI',
];

// Generate all stamp templates
const allStampTemplates = [];
indianStates.forEach((state) => {
  documentTypes.forEach((docType) => {
    allStampTemplates.push({
      id: uuidv4(),
      state,
      documentType: docType,
      basePrice: 10100, // ₹101 default
      convenienceFee: 7697, // ₹76.97 after discount
      description: `Non-judicial stamp paper for ${docType} in ${state}`,
      metadata: {
        originalConvenienceFee: 9197, // ₹91.97 before discount
        platformDiscount: 1500, // ₹15 automatic discount
      },
      isActive: true,
    });
  });
});

// Stamp Promo Codes
const allStampPromoCodes = [
  {
    id: uuidv4(),
    code: 'SUPER',
    discountType: 'fixed',
    discountValue: 1500, // ₹15 off
    maxDiscount: null,
    minOrderAmount: 10000, // ₹100 minimum
    validFrom: new Date('2025-01-01'),
    validUntil: new Date('2025-12-31'),
    usageLimit: 1000,
    usageCount: 0,
    isActive: true,
  },
  {
    id: uuidv4(),
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10, // 10% off
    maxDiscount: 5000, // Max ₹50 discount
    minOrderAmount: 15000, // ₹150 minimum
    validFrom: new Date('2025-01-01'),
    validUntil: new Date('2025-12-31'),
    usageLimit: 500,
    usageCount: 0,
    isActive: true,
  },
  {
    id: uuidv4(),
    code: 'FESTIVE20',
    discountType: 'percentage',
    discountValue: 20, // 20% off
    maxDiscount: 10000, // Max ₹100 discount
    minOrderAmount: 20000, // ₹200 minimum
    validFrom: new Date('2025-10-01'),
    validUntil: new Date('2025-11-30'),
    usageLimit: 100,
    usageCount: 0,
    isActive: true,
  },
];

async function deployProductionPackages() {
  const env = process.env.NODE_ENV || 'development';

  log(`🚀 Fresh Production Deployment - Packages & Stamps`, 'bright');
  log(`Environment: ${env.toUpperCase()}`, 'yellow');
  log(`Total packages to deploy: ${allPackages.length}`, 'cyan');
  log(`Total stamp templates to deploy: ${allStampTemplates.length}`, 'cyan');
  log(`Total promo codes to deploy: ${allStampPromoCodes.length}`, 'cyan');
  console.log('');

  // Environment validation
  if (env !== 'production') {
    logWarning(`This script is designed for production environment only`);
    logError(`Current environment: ${env}`);
    log('Please set NODE_ENV=production and try again');
    process.exit(1);
  }

  let sequelize;
  let Package;
  let StampTemplate;
  let StampPromoCode;

  try {
    // Initialize database connection
    logStep(1, 'Initializing database connection');
    sequelize = require('./src/config/database');
    ({ Package, StampTemplate, StampPromoCode } = require('./src/models'));

    await sequelize.authenticate();
    logSuccess('Database connection established');

    // Clear existing packages if requested
    logStep(2, 'Preparing packages table');
    const existingCount = await Package.count();
    logInfo(`Found ${existingCount} existing packages in database`);

    // Insert/Update all packages
    logStep(3, 'Deploying all packages');
    let createdCount = 0;
    let updatedCount = 0;
    let errorCount = 0;

    for (const packageData of allPackages) {
      try {
        // Convert features array to JSON string for database storage
        const packageForDB = {
          ...packageData,
          features: JSON.stringify(packageData.features)
        };

        const [packageInstance, created] = await Package.upsert(packageForDB, {
          where: { name: packageData.name },
          returning: true
        });
        if (created) {
          createdCount++;
          log(`✨ Created: ${packageData.name} (₹${packageData.price.toLocaleString('en-IN')})`, 'green');
        } else {
          updatedCount++;
          log(`🔄 Updated: ${packageData.name} (₹${packageData.price.toLocaleString('en-IN')})`, 'yellow');
        }
      } catch (error) {
        errorCount++;
        logError(`Failed to process ${packageData.name}: ${error.message}`);
      }
    }

    // Verification
    logStep(4, 'Verifying deployment');
    const finalCount = await Package.count();
    const activeCount = await Package.count({ where: { is_active: true } });

    log('\n📊 Deployment Summary:', 'bright');
    log('═'.repeat(50), 'cyan');
    log(`📦 Total packages in database: ${finalCount}`, 'cyan');
    log(`✅ Active packages: ${activeCount}`, 'green');
    log(`🆕 Newly created: ${createdCount}`, 'green');
    log(`🔄 Updated existing: ${updatedCount}`, 'yellow');
    log(`❌ Errors: ${errorCount}`, errorCount > 0 ? 'red' : 'green');

    // Category breakdown
    logStep(5, 'Category breakdown verification');
    const categories = [...new Set(allPackages.map(p => p.category))];
    
    for (const category of categories) {
      const categoryPackages = allPackages.filter(p => p.category === category);
      const dbCount = await Package.count({
        where: {
          name: categoryPackages.map(p => p.name)
        }
      });
      log(`📂 ${category}: ${dbCount}/${categoryPackages.length} packages`, 'blue');
    }

    // Deploy Stamp Templates
    logStep(6, 'Deploying stamp templates');
    let templatesCreated = 0;
    let templatesUpdated = 0;
    let templatesErrors = 0;

    for (const templateData of allStampTemplates) {
      try {
        const [template, created] = await StampTemplate.upsert({
          ...templateData,
          metadata: JSON.stringify(templateData.metadata)
        }, {
          returning: true
        });

        if (created) {
          templatesCreated++;
        } else {
          templatesUpdated++;
        }
      } catch (error) {
        templatesErrors++;
        logError(`Failed to process template ${templateData.state} - ${templateData.documentType}: ${error.message}`);
      }
    }

    logSuccess(`Stamp templates deployed: ${templatesCreated} created, ${templatesUpdated} updated`);
    if (templatesErrors > 0) {
      logWarning(`Stamp template errors: ${templatesErrors}`);
    }

    // Deploy Stamp Promo Codes
    logStep(7, 'Deploying stamp promo codes');
    let promosCreated = 0;
    let promosUpdated = 0;
    let promosErrors = 0;
    for (const promoData of allStampPromoCodes) {
      try {
        const [promo, created] = await StampPromoCode.findOrCreate({
          where: { code: promoData.code },
          defaults: promoData
        });
        
        if (!created) {
          await promo.update(promoData);
        }

        if (created) {
          promosCreated++;
          log(`✨ Created promo: ${promoData.code} (${promoData.discountType})`, 'green');
        } else {
          promosUpdated++;
          log(`🔄 Updated promo: ${promoData.code}`, 'yellow');
        }
      } catch (error) {
        promosErrors++;
        logError(`Failed to process promo ${promoData.code}: ${error.message}`);
      }
    }    
    logSuccess(`Promo codes deployed: ${promosCreated} created, ${promosUpdated} updated`);
    if (promosErrors > 0) {
      logWarning(`Promo code errors: ${promosErrors}`);
    }

    // Final verification
    logStep(8, 'Final verification');
    const finalTemplateCount = await StampTemplate.count();
    const activeTemplateCount = await StampTemplate.count({ where: { isActive: true } });
    const finalPromoCount = await StampPromoCode.count();
    const activePromoCount = await StampPromoCode.count({ where: { isActive: true } });

    log('\n📊 Complete Deployment Summary:', 'bright');
    log('═'.repeat(60), 'cyan');
    log('📦 PACKAGES:', 'bright');
    log(`   Total packages in database: ${finalCount}`, 'cyan');
    log(`   Active packages: ${activeCount}`, 'green');
    log(`   Newly created: ${createdCount}`, 'green');
    log(`   Updated existing: ${updatedCount}`, 'yellow');
    log(`   Errors: ${errorCount}`, errorCount > 0 ? 'red' : 'green');
    
    log('\n📄 STAMP TEMPLATES:', 'bright');
    log(`   Total templates in database: ${finalTemplateCount}`, 'cyan');
    log(`   Active templates: ${activeTemplateCount}`, 'green');
    log(`   Newly created: ${templatesCreated}`, 'green');
    log(`   Updated existing: ${templatesUpdated}`, 'yellow');
    log(`   Errors: ${templatesErrors}`, templatesErrors > 0 ? 'red' : 'green');
    
    log('\n🎫 PROMO CODES:', 'bright');
    log(`   Total promo codes in database: ${finalPromoCount}`, 'cyan');
    log(`   Active promo codes: ${activePromoCount}`, 'green');
    log(`   Newly created: ${promosCreated}`, 'green');
    log(`   Updated existing: ${promosUpdated}`, 'yellow');
    log(`   Errors: ${promosErrors}`, promosErrors > 0 ? 'red' : 'green');

    const totalErrors = errorCount + templatesErrors + promosErrors;
    
    if (totalErrors === 0) {
      log('\n🎉 Production deployment completed successfully!', 'bright');
      logSuccess('All packages, stamp templates, and promo codes are now available in production');
      log('🔧 The platform is ready to handle all service requests', 'green');
    } else {
      logWarning(`Deployment completed with ${totalErrors} total errors`);
      log('Please review the errors above and re-run if necessary', 'yellow');
    }

  } catch (error) {
    logError('Fatal error during deployment');
    console.error(error);
    process.exit(1);
  } finally {
    if (sequelize) {
      await sequelize.close();
      logInfo('Database connection closed');
    }
  }
}

// Script execution
if (require.main === module) {
  deployProductionPackages()
    .then(() => {
      log('\n✅ Deployment script completed', 'green');
      process.exit(0);
    })
    .catch((error) => {
      logError('Deployment script failed');
      console.error(error);
      process.exit(1);
    });
}

module.exports = { 
  deployProductionPackages, 
  allPackages, 
  allStampTemplates, 
  allStampPromoCodes 
};