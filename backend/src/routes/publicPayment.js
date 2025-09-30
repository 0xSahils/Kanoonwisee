const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { Package } = require('../models');
const razorpayConfig = require('../config/razorpay');

// Razorpay configuration (test mode)
const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id: razorpayConfig.keyId,
  key_secret: razorpayConfig.keySecret
});

/**
 * Get all active packages for public business services
 * No authentication required
 */
router.get('/packages', async (req, res) => {
  try {
    const packages = await Package.findAll({
      where: { is_active: true },
      attributes: ['id', 'name', 'price', 'duration', 'description', 'features'],
      order: [['name', 'ASC']]
    });

    // Parse features JSON for each package
    const formattedPackages = packages.map(pkg => {
      let features = [];
      if (pkg.features) {
        try {
          // Handle double-encoded JSON strings (new packages)
          let featuresStr = pkg.features;
          if (typeof featuresStr === 'string' && featuresStr.startsWith('"') && featuresStr.endsWith('"')) {
            // Remove outer quotes if present
            featuresStr = featuresStr.slice(1, -1);
            // Unescape inner quotes
            featuresStr = featuresStr.replace(/\\"/g, '"');
          }

          // Try to parse as JSON first (new packages)
          const parsed = JSON.parse(featuresStr);
          if (Array.isArray(parsed)) {
            features = parsed;
          } else {
            // If it's not an array, treat as single feature
            features = [parsed];
          }
        } catch (jsonError) {
          // If JSON parsing fails, treat as plain string (old packages)
          // Split by common delimiters or treat as single feature
          const featuresStr = pkg.features;
          if (featuresStr.includes('\n')) {
            features = featuresStr.split('\n').filter(f => f.trim());
          } else if (featuresStr.includes(',')) {
            features = featuresStr.split(',').map(f => f.trim());
          } else {
            features = [featuresStr];
          }
        }
      }
      return {
        ...pkg.toJSON(),
        features
      };
    });

    res.json({
      success: true,
      data: formattedPackages
    });

  } catch (error) {
    console.error('Error fetching public packages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch packages',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * Create order for public business service payment
 * No authentication required
 */
router.post('/create-order', async (req, res) => {
  try {
    const { packageId, customerDetails } = req.body;

    // Validate input
    if (!packageId || !customerDetails) {
      return res.status(400).json({
        success: false,
        message: 'Package ID and customer details are required'
      });
    }

    // Validate customer details
    const { name, email, phone } = customerDetails;
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Customer name, email, and phone are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Phone validation (basic)
    if (phone.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number'
      });
    }

    // Get package details
    const package = await Package.findByPk(packageId);
    if (!package || !package.is_active) {
      return res.status(404).json({
        success: false,
        message: 'Package not found or inactive'
      });
    }

    // Create Razorpay order
    const orderOptions = {
      amount: Math.round(package.price * 100), // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      notes: {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        package_id: packageId,
        package_name: package.name,
        service_type: 'business_service',
        payment_type: 'public_purchase'
      }
    };

    const order = await razorpay.orders.create(orderOptions);

    // Return order details for frontend
    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      },
      package: {
        id: package.id,
        name: package.name,
        price: package.price,
        description: package.description
      },
      razorpayKeyId: razorpayConfig.keyId
    });

  } catch (error) {
    console.error('Error creating public payment order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * Verify payment for public business service
 * No authentication required
 */
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customerDetails } = req.body;

    // Validate input
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification data'
      });
    }

    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', razorpayConfig.keySecret)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    // Get payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    const order = await razorpay.orders.fetch(razorpay_order_id);

    // Here you could store the payment record in database if needed
    // For now, we'll just return success with payment details

    res.json({
      success: true,
      message: 'Payment verified successfully',
      payment: {
        id: payment.id,
        order_id: order.id,
        amount: payment.amount / 100, // Convert back to rupees
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        created_at: new Date(payment.created_at * 1000)
      },
      order: {
        id: order.id,
        receipt: order.receipt,
        notes: order.notes
      },
      customer: customerDetails
    });

  } catch (error) {
    console.error('Error verifying public payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * Get payment status for public order
 * No authentication required
 */
router.get('/payment-status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    // Get order details from Razorpay
    const order = await razorpay.orders.fetch(orderId);
    
    // Get payments for this order
    const payments = await razorpay.orders.fetchPayments(orderId);

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount / 100,
        currency: order.currency,
        status: order.status,
        created_at: new Date(order.created_at * 1000),
        notes: order.notes
      },
      payments: payments.items.map(payment => ({
        id: payment.id,
        amount: payment.amount / 100,
        status: payment.status,
        method: payment.method,
        created_at: new Date(payment.created_at * 1000)
      }))
    });

  } catch (error) {
    console.error('Error fetching payment status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;