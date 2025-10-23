const { StampTemplate, StampPromoCode } = require('./src/models');

async function verify() {
  try {
    // Count templates
    const templateCount = await StampTemplate.count();
    console.log('✅ Total Stamp Templates:', templateCount);

    // Count promo codes
    const promoCount = await StampPromoCode.count();
    console.log('✅ Total Promo Codes:', promoCount);

    // Count Haryana templates
    const haryanaCount = await StampTemplate.count({
      where: { state: 'HARYANA' }
    });
    console.log('✅ Haryana Templates:', haryanaCount);

    // Sample template
    const sample = await StampTemplate.findOne({
      where: { state: 'HARYANA' }
    });
    console.log('\n📄 Sample Template:');
    console.log(JSON.stringify(sample, null, 2));

    // Sample promo code
    const promo = await StampPromoCode.findOne({
      where: { code: 'SUPER' }
    });
    console.log('\n🎫 Sample Promo Code:');
    console.log(JSON.stringify(promo, null, 2));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

verify();
