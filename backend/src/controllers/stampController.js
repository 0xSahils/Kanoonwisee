const { StampTemplate, StampOrder, StampPromoCode, User } = require('../models');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { generateStampPdf, generateVerificationHash } = require('../utils/stampPdfGenerator');
const { uploadToS3, getPresignedUrl } = require('../config/s3');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Get all available states
exports.getStates = async (req, res) => {
  try {
    const states = await StampTemplate.findAll({
      attributes: ['state'],
      where: { isActive: true },
      group: ['state'],
      order: [['state', 'ASC']],
    });

    const stateList = states.map((s) => s.state);

    return res.json({
      success: true,
      data: stateList,
    });
  } catch (error) {
    console.error('Get states error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch states',
    });
  }
};

// Get templates by state
exports.getTemplatesByState = async (req, res) => {
  try {
    const { state } = req.params;

    const templates = await StampTemplate.findAll({
      where: {
        state: state.toUpperCase(),
        isActive: true,
      },
      order: [['documentType', 'ASC']],
    });

    return res.json({
      success: true,
      data: templates,
    });
  } catch (error) {
    console.error('Get templates error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch stamp templates',
    });
  }
};

// Create draft order
exports.createDraftOrder = async (req, res) => {
  try {
    const {
      state,
      documentType,
      purpose,
      firstPartyName,
      firstPartyPhone,
      secondPartyName,
      secondPartyPhone,
      stampAmount,
      payingParty,
      guestEmail,
      guestPhone,
    } = req.body;

    // Find template
    const template = await StampTemplate.findOne({
      where: {
        state: state.toUpperCase(),
        documentType,
        isActive: true,
      },
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Stamp template not found for selected state and document type',
      });
    }

    // Calculate pricing
    const basePrice = stampAmount;
    const convenienceFee = template.convenienceFee;
    const totalAmount = basePrice + convenienceFee;

    const order = await StampOrder.create({
      userId: req.user?.id || null,
      templateId: template.id,
      state: state.toUpperCase(),
      documentType,
      purpose: purpose || null,
      firstPartyName,
      firstPartyPhone: firstPartyPhone || null,
      secondPartyName,
      secondPartyPhone: secondPartyPhone || null,
      stampAmount: basePrice,
      payingParty,
      basePrice,
      convenienceFee,
      totalAmount,
      status: 'draft',
      guestEmail: guestEmail || req.user?.email || null,
      guestPhone: guestPhone || null,
    });

    return res.json({
      success: true,
      data: {
        orderId: order.id,
        totalAmount: order.totalAmount,
        breakdown: {
          stampPaper: basePrice,
          convenienceFee,
          serviceCharge: 0,
          discount: 0,
          total: totalAmount,
        },
      },
    });
  } catch (error) {
    console.error('Create draft order error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create stamp order',
    });
  }
};

// Update service selection
exports.updateServiceSelection = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { serviceType, doorstepDelivery, promoCode, deliveryAddress } = req.body;

    const order = await StampOrder.findByPk(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Check authorization
    if (order.userId && req.user?.id !== order.userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to order',
      });
    }

    // Calculate service charge
    let serviceCharge = 0;
    if (serviceType === 'express') {
      serviceCharge = 7000; // ₹70 in paise
    }

    // Calculate doorstep delivery charge
    let doorstepCharge = 0;
    if (doorstepDelivery) {
      doorstepCharge = 12000; // ₹120 in paise
    }

    // Apply promo code
    let promoDiscount = 0;
    let appliedPromoCode = null;

    if (promoCode) {
      const promo = await StampPromoCode.findOne({
        where: { code: promoCode.toUpperCase() },
      });

      if (promo) {
        const subtotal = order.basePrice + order.convenienceFee + serviceCharge + doorstepCharge;
        promoDiscount = promo.calculateDiscount(subtotal);
        if (promoDiscount > 0) {
          appliedPromoCode = promo.code;
        }
      }
    }

    const totalAmount = order.basePrice + order.convenienceFee + serviceCharge + doorstepCharge - promoDiscount;

    // Update order
    order.serviceType = serviceType;
    order.doorstepDelivery = doorstepDelivery || false;
    order.serviceCharge = serviceCharge;
    order.promoCode = appliedPromoCode;
    order.promoDiscount = promoDiscount;
    order.totalAmount = totalAmount;
    order.status = 'pending_payment';
    
    // Store delivery address in metadata if doorstep delivery is selected
    if (doorstepDelivery && deliveryAddress) {
      order.metadata = {
        ...order.metadata,
        deliveryAddress: {
          name: deliveryAddress.name,
          phone: deliveryAddress.phone,
          address: deliveryAddress.address,
          city: deliveryAddress.city,
          pincode: deliveryAddress.pincode,
          state: deliveryAddress.state,
        },
      };
    }
    
    await order.save();

    return res.json({
      success: true,
      data: {
        orderId: order.id,
        totalAmount: order.totalAmount,
        breakdown: {
          stampPaper: order.basePrice,
          convenienceFee: order.convenienceFee,
          serviceCharge: order.serviceCharge,
          doorstepCharge: doorstepCharge,
          discount: order.promoDiscount,
          total: order.totalAmount,
        },
      },
    });
  } catch (error) {
    console.error('Update service selection error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update service selection',
    });
  }
};

// Get all active promo codes
exports.getPromoCodes = async (req, res) => {
  try {
    const promoCodes = await StampPromoCode.findAll({
      where: { isActive: true },
      attributes: ['id', 'code', 'discountType', 'discountValue', 'maxDiscount', 'minOrderAmount', 'validFrom', 'validUntil', 'usageLimit', 'usageCount'],
      order: [['createdAt', 'DESC']],
    });

    // Filter out expired promo codes
    const now = new Date();
    const activePromoCodes = promoCodes.filter(promo => {
      if (promo.validUntil && new Date(promo.validUntil) < now) {
        return false;
      }
      if (promo.validFrom && new Date(promo.validFrom) > now) {
        return false;
      }
      if (promo.usageLimit && promo.usageCount >= promo.usageLimit) {
        return false;
      }
      return true;
    });

    return res.json({
      success: true,
      data: activePromoCodes,
    });
  } catch (error) {
    console.error('Get promo codes error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch promo codes',
    });
  }
};

// Validate promo code
exports.validatePromoCode = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    const promo = await StampPromoCode.findOne({
      where: { code: code.toUpperCase() },
    });

    if (!promo) {
      return res.status(404).json({
        success: false,
        message: 'Invalid promo code',
      });
    }

    if (!promo.isValid(orderAmount)) {
      return res.status(400).json({
        success: false,
        message: 'Promo code is expired or not applicable',
      });
    }

    const discount = promo.calculateDiscount(orderAmount);

    return res.json({
      success: true,
      data: {
        discount,
        discountType: promo.discountType,
        message: `You saved ₹${(discount / 100).toFixed(2)}`,
      },
    });
  } catch (error) {
    console.error('Validate promo code error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to validate promo code',
    });
  }
};

// Create Razorpay order
exports.createPaymentOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await StampOrder.findByPk(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    if (order.status !== 'pending_payment' && order.status !== 'draft') {
      return res.status(400).json({
        success: false,
        message: 'Order is not in pending payment state',
      });
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: order.totalAmount,
      currency: order.currency,
      receipt: order.id,
      payment_capture: 1,
    });

    order.razorpayOrderId = razorpayOrder.id;
    order.status = 'pending_payment';
    await order.save();

    return res.json({
      success: true,
      data: {
        orderId: order.id,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    console.error('Create payment order error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
    });
  }
};

// Verify payment and generate stamp
exports.verifyPaymentAndGenerate = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { razorpay_payment_id, razorpay_signature } = req.body;

    const order = await StampOrder.findByPk(orderId, {
      include: [{ model: StampTemplate, as: 'template' }],
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Verify Razorpay signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${order.razorpayOrderId}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature !== razorpay_signature) {
      order.status = 'failed';
      await order.save();
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }

    // Update payment details
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    order.status = 'payment_verified';
    await order.save();

    // Generate verification hash
    const timestamp = Date.now();
    const verificationHash = generateVerificationHash(order.id, order.stampAmount, timestamp);

    order.verificationHash = verificationHash;
    order.status = 'generating';
    await order.save();

    // Generate PDF (async)
    try {
      const pdfBuffer = await generateStampPdf(order, verificationHash);

      // Upload to S3
      const s3Key = `stamps/${order.id}/${Date.now()}.pdf`;
      await uploadToS3(pdfBuffer, s3Key, 'application/pdf');

      // Get presigned URL (valid for 7 days)
      const { url: presignedUrl } = await getPresignedUrl(s3Key, 7 * 24 * 60 * 60);

      order.s3Key = s3Key;
      order.s3PresignedUrl = presignedUrl;
      order.presignedUrlExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      order.status = 'generated';
      order.completedAt = new Date();
      order.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
      await order.save();

      // Increment promo usage
      if (order.promoCode) {
        await StampPromoCode.increment('usageCount', {
          where: { code: order.promoCode },
        });
      }

      return res.json({
        success: true,
        data: {
          orderId: order.id,
          downloadUrl: presignedUrl,
          verificationHash,
          message: 'Stamp paper generated successfully',
        },
      });
    } catch (pdfError) {
      console.error('PDF generation error:', pdfError);
      order.status = 'failed';
      order.metadata = { ...order.metadata, error: pdfError.message };
      await order.save();

      return res.status(500).json({
        success: false,
        message: 'Failed to generate stamp paper',
      });
    }
  } catch (error) {
    console.error('Verify payment error:', error);
    return res.status(500).json({
      success: false,
      message: 'Payment verification failed',
    });
  }
};

// Get order details
exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await StampOrder.findByPk(orderId, {
      include: [{ model: StampTemplate, as: 'template' }],
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Check authorization
    if (order.userId && req.user?.id !== order.userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to order',
      });
    }

    // Refresh presigned URL if expired
    if (order.s3Key && order.presignedUrlExpiry < new Date()) {
      const newPresignedUrl = await getPresignedUrl(order.s3Key, 7 * 24 * 60 * 60);
      order.s3PresignedUrl = newPresignedUrl;
      order.presignedUrlExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await order.save();
    }

    return res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Get order details error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch order details',
    });
  }
};

// Verify stamp (public QR verification)
exports.verifyStamp = async (req, res) => {
  try {
    const { verificationHash } = req.params;

    const order = await StampOrder.findOne({
      where: { verificationHash },
      include: [{ model: StampTemplate, as: 'template' }],
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Stamp not found or invalid verification hash',
      });
    }

    if (order.status === 'revoked') {
      return res.status(400).json({
        success: false,
        message: 'This stamp has been revoked',
      });
    }

    const isExpired = order.isExpired();

    return res.json({
      success: true,
      data: {
        isValid: (order.status === 'generated' || order.status === 'delivered') && !isExpired,
        orderId: order.id,
        state: order.state,
        documentType: order.documentType,
        stampAmount: order.stampAmount,
        firstPartyName: order.firstPartyName,
        secondPartyName: order.secondPartyName,
        completedAt: order.completedAt,
        expiresAt: order.expiresAt,
        status: order.status,
        isExpired,
      },
    });
  } catch (error) {
    console.error('Verify stamp error:', error);
    return res.status(500).json({
      success: false,
      message: 'Verification failed',
    });
  }
};

// Admin: Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;

    const where = {};
    if (status) {
      where.status = status;
    }

    const orders = await StampOrder.findAndCountAll({
      where,
      include: [
        { model: StampTemplate, as: 'template' },
        { model: User, as: 'user', attributes: ['id', 'email', 'role'] },
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
    });

    return res.json({
      success: true,
      data: {
        orders: orders.rows,
        total: orders.count,
        page: parseInt(page),
        totalPages: Math.ceil(orders.count / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
    });
  }
};

// Admin: Revoke stamp
exports.revokeStamp = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;

    const order = await StampOrder.findByPk(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.status = 'revoked';
    order.metadata = {
      ...order.metadata,
      revokedAt: new Date(),
      revokedBy: req.user.id,
      revocationReason: reason,
    };
    await order.save();

    return res.json({
      success: true,
      message: 'Stamp revoked successfully',
    });
  } catch (error) {
    console.error('Revoke stamp error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to revoke stamp',
    });
  }
};
