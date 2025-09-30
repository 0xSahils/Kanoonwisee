const Razorpay = require('razorpay');
const crypto = require('crypto');
const { Package, Order, User } = require('../models');
const razorpayConfig = require('../config/razorpay');

// Initialize Razorpay instance only if configured
let razorpay = null;
if (razorpayConfig.isConfigured()) {
  razorpay = new Razorpay({
    key_id: razorpayConfig.keyId,
    key_secret: razorpayConfig.keySecret,
  });
  console.log('✅ Razorpay initialized successfully');
} else {
  console.warn('⚠️ Razorpay not initialized due to missing configuration');
}

class PaymentService {
  /**
   * Create a new order for payment
   */
  async createOrder(packageId, userId) {
    try {
      // Check if Razorpay is configured
      if (!razorpay) {
        throw new Error('Payment gateway not configured. Please contact administrator to set up Razorpay credentials.');
      }

      // Fetch package details from database
      const packageData = await Package.findByPk(packageId);
      if (!packageData) {
        throw new Error('Package not found');
      }

      if (!packageData.is_active) {
        throw new Error('Package is not available');
      }

      // Verify user exists
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Convert price to smallest currency unit (paise for INR)
      const amountInPaise = Math.round(packageData.price * 100);

      // Generate receipt number
      const receipt = `receipt_${packageId}_${userId}_${Date.now()}`;

      // Create order in Razorpay
      const razorpayOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: razorpayConfig.currency,
        receipt: receipt,
        notes: {
          packageId: packageId,
          userId: userId,
          packageName: packageData.name,
          userEmail: user.email,
        },
      });

      // Save order in database
      const order = await Order.create({
        order_id: razorpayOrder.id,
        package_id: packageId,
        user_id: userId,
        amount: amountInPaise,
        currency: razorpayOrder.currency,
        status: 'CREATED',
        receipt: receipt,
        notes: {
          packageName: packageData.name,
          userEmail: user.email,
        },
      });

      return {
        orderId: razorpayOrder.id,
        keyId: razorpayConfig.keyId,
        amount: amountInPaise,
        currency: razorpayOrder.currency,
        packageName: packageData.name,
        receipt: receipt,
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error(error.message || 'Failed to create order');
    }
  }

  /**
   * Verify payment signature and update order status
   */
  async verifyPayment(orderId, paymentId, signature, userId) {
    try {
      // Find order in database
      const order = await Order.findOne({
        where: { order_id: orderId, user_id: userId },
        include: [
          { model: Package, as: 'package' },
          { model: User, as: 'user' },
        ],
      });

      if (!order) {
        return { success: false, error: 'Order not found' };
      }

      if (order.status === 'PAID') {
        return { success: true, order, message: 'Payment already verified' };
      }

      // Verify signature using HMAC SHA256
      const body = orderId + '|' + paymentId;
      const expectedSignature = crypto
        .createHmac('sha256', razorpayConfig.keySecret)
        .update(body.toString())
        .digest('hex');

      if (expectedSignature !== signature) {
        // Update order status to FAILED
        await order.update({
          status: 'FAILED',
          payment_id: paymentId,
          signature: signature,
        });

        return { success: false, error: 'Invalid payment signature' };
      }

      // Fetch payment details from Razorpay to get additional info
      let paymentDetails = null;
      try {
        paymentDetails = await razorpay.payments.fetch(paymentId);
      } catch (fetchError) {
        console.warn('Could not fetch payment details:', fetchError.message);
      }

      // Update order status to PAID
      await order.update({
        status: 'PAID',
        payment_id: paymentId,
        signature: signature,
        notes: {
          ...order.notes,
          paymentMethod: paymentDetails?.method || 'unknown',
          paymentDate: new Date().toISOString(),
        },
      });

      // Reload order with associations
      const updatedOrder = await Order.findByPk(order.id, {
        include: [
          { model: Package, as: 'package' },
          { model: User, as: 'user' },
        ],
      });

      return { success: true, order: updatedOrder };
    } catch (error) {
      console.error('Error verifying payment:', error);
      return { success: false, error: 'Payment verification failed' };
    }
  }

  /**
   * Get all active packages
   */
  async getActivePackages() {
    try {
      const packages = await Package.findAll({
        where: { is_active: true },
        order: [['price', 'ASC']],
      });

      return packages;
    } catch (error) {
      console.error('Error fetching packages:', error);
      throw new Error('Failed to fetch packages');
    }
  }

  /**
   * Get user orders with optional status filter
   */
  async getUserOrders(userId, status = null) {
    try {
      const whereClause = { user_id: userId };
      if (status) {
        whereClause.status = status.toUpperCase();
      }

      const orders = await Order.findAll({
        where: whereClause,
        include: [
          { model: Package, as: 'package' },
        ],
        order: [['created_at', 'DESC']],
      });

      return orders;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw new Error('Failed to fetch orders');
    }
  }

  /**
   * Get order details by order ID
   */
  async getOrderDetails(orderId, userId) {
    try {
      const order = await Order.findOne({
        where: { order_id: orderId, user_id: userId },
        include: [
          { model: Package, as: 'package' },
          { model: User, as: 'user', attributes: ['id', 'email', 'role'] },
        ],
      });

      return order;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw new Error('Failed to fetch order details');
    }
  }

  /**
   * Handle Razorpay webhooks
   */
  async handleWebhook(webhookBody, webhookSignature) {
    try {
      // Verify webhook signature
      const expectedSignature = crypto
        .createHmac('sha256', razorpayConfig.keySecret)
        .update(JSON.stringify(webhookBody))
        .digest('hex');

      if (expectedSignature !== webhookSignature) {
        console.warn('Invalid webhook signature');
        return { success: false, error: 'Invalid signature' };
      }

      const { event, payload } = webhookBody;

      switch (event) {
        case 'payment.captured':
          await this.handlePaymentCaptured(payload.payment.entity);
          break;
        case 'payment.failed':
          await this.handlePaymentFailed(payload.payment.entity);
          break;
        case 'order.paid':
          await this.handleOrderPaid(payload.order.entity);
          break;
        default:
          console.log(`Unhandled webhook event: ${event}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Error handling webhook:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Handle payment.captured webhook
   */
  async handlePaymentCaptured(payment) {
    try {
      const order = await Order.findOne({
        where: { order_id: payment.order_id },
      });

      if (order && order.status !== 'PAID') {
        await order.update({
          status: 'PAID',
          payment_id: payment.id,
          notes: {
            ...order.notes,
            webhookProcessed: true,
            paymentMethod: payment.method,
            capturedAt: new Date().toISOString(),
          },
        });
        console.log(`Payment captured for order ${payment.order_id}`);
      }
    } catch (error) {
      console.error('Error handling payment captured:', error);
    }
  }

  /**
   * Handle payment.failed webhook
   */
  async handlePaymentFailed(payment) {
    try {
      const order = await Order.findOne({
        where: { order_id: payment.order_id },
      });

      if (order && order.status === 'CREATED') {
        await order.update({
          status: 'FAILED',
          payment_id: payment.id,
          notes: {
            ...order.notes,
            webhookProcessed: true,
            failureReason: payment.error_description || 'Payment failed',
            failedAt: new Date().toISOString(),
          },
        });
        console.log(`Payment failed for order ${payment.order_id}`);
      }
    } catch (error) {
      console.error('Error handling payment failed:', error);
    }
  }

  /**
   * Handle order.paid webhook
   */
  async handleOrderPaid(razorpayOrder) {
    try {
      const order = await Order.findOne({
        where: { order_id: razorpayOrder.id },
      });

      if (order && order.status !== 'PAID') {
        await order.update({
          status: 'PAID',
          notes: {
            ...order.notes,
            webhookProcessed: true,
            orderPaidAt: new Date().toISOString(),
          },
        });
        console.log(`Order paid webhook processed for order ${razorpayOrder.id}`);
      }
    } catch (error) {
      console.error('Error handling order paid:', error);
    }
  }
}

module.exports = new PaymentService();