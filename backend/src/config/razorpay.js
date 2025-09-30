const dotenv = require('dotenv');
dotenv.config();

const razorpayConfig = {
  keyId: process.env.RAZORPAY_KEY_ID,
  keySecret: process.env.RAZORPAY_KEY_SECRET,
  currency: 'INR',
  
  // Validate configuration
  isConfigured() {
    return !!(this.keyId && this.keySecret);
  },
  
  // Get configuration for client-side
  getPublicConfig() {
    return {
      keyId: this.keyId,
      currency: this.currency,
    };
  },
};

// Validate on module load
if (!razorpayConfig.isConfigured()) {
  console.warn('⚠️ Razorpay configuration incomplete. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your environment variables.');
}

module.exports = razorpayConfig;