const { StampOrder, StampTemplate, StampPromoCode, User } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');
const { getPresignedUrl } = require('../config/s3');
const stampPdfGenerator = require('../utils/stampPdfGenerator');

// Get all orders with filters
exports.getAllOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      search,
      dateFrom,
      dateTo,
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where[Op.or] = [
        { id: { [Op.iLike]: `%${search}%` } },
        { firstPartyName: { [Op.iLike]: `%${search}%` } },
        { secondPartyName: { [Op.iLike]: `%${search}%` } },
        { guestEmail: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (dateFrom) {
      where.createdAt = { [Op.gte]: new Date(dateFrom) };
    }

    if (dateTo) {
      where.createdAt = {
        ...where.createdAt,
        [Op.lte]: new Date(dateTo),
      };
    }

    const { count, rows: orders } = await StampOrder.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'role'],
        },
        {
          model: StampTemplate,
          as: 'template',
          attributes: ['id', 'documentType', 'state'],
        },
      ],
    });

    return res.json({
      success: true,
      data: {
        orders,
        total: count,
        page: parseInt(page),
        totalPages: Math.ceil(count / limit),
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

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await StampOrder.findByPk(orderId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'role'],
        },
        {
          model: StampTemplate,
          as: 'template',
        },
        {
          model: StampPromoCode,
          as: 'appliedPromoCode',
        },
      ],
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    return res.json({
      success: true,
      data: { order },
    });
  } catch (error) {
    console.error('Get order by ID error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
    });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      'draft',
      'pending_payment',
      'payment_verified',
      'generating',
      'generated',
      'delivered',
      'failed',
      'cancelled',
      'revoked',
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const order = await StampOrder.findByPk(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.status = status;

    if (status === 'delivered' || status === 'generated') {
      order.completedAt = new Date();
    }

    await order.save();

    return res.json({
      success: true,
      data: { order },
      message: 'Order status updated successfully',
    });
  } catch (error) {
    console.error('Update order status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update order status',
    });
  }
};

// Download order PDF
exports.downloadOrderPDF = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await StampOrder.findByPk(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    if (!order.s3Key) {
      return res.status(400).json({
        success: false,
        message: 'PDF not generated yet',
      });
    }

    // Get presigned URL
    const { url } = await getPresignedUrl(order.s3Key, 300); // 5 minutes

    return res.json({
      success: true,
      data: { downloadUrl: url },
    });
  } catch (error) {
    console.error('Download order PDF error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate download URL',
    });
  }
};

// Get all templates
exports.getAllTemplates = async (req, res) => {
  try {
    const { state, documentType } = req.query;
    const where = {};

    if (state) {
      where.state = state.toUpperCase();
    }

    if (documentType) {
      where.documentType = { [Op.iLike]: `%${documentType}%` };
    }

    const templates = await StampTemplate.findAll({
      where,
      order: [
        ['state', 'ASC'],
        ['documentType', 'ASC'],
      ],
    });

    return res.json({
      success: true,
      data: { templates },
    });
  } catch (error) {
    console.error('Get all templates error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch templates',
    });
  }
};

// Get template by ID
exports.getTemplateById = async (req, res) => {
  try {
    const { templateId } = req.params;

    const template = await StampTemplate.findByPk(templateId);
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found',
      });
    }

    return res.json({
      success: true,
      data: { template },
    });
  } catch (error) {
    console.error('Get template by ID error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch template',
    });
  }
};

// Create template
exports.createTemplate = async (req, res) => {
  try {
    const { state, documentType, basePrice, convenienceFee, description, metadata } = req.body;

    // Check if template already exists
    const existing = await StampTemplate.findOne({
      where: {
        state: state.toUpperCase(),
        documentType,
      },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Template already exists for this state and document type',
      });
    }

    const template = await StampTemplate.create({
      state: state.toUpperCase(),
      documentType,
      basePrice,
      convenienceFee,
      description: description || null,
      metadata: metadata || {},
    });

    return res.status(201).json({
      success: true,
      data: { template },
      message: 'Template created successfully',
    });
  } catch (error) {
    console.error('Create template error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create template',
    });
  }
};

// Update template
exports.updateTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;
    const { state, documentType, basePrice, convenienceFee, description, metadata } = req.body;

    const template = await StampTemplate.findByPk(templateId);
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found',
      });
    }

    template.state = state?.toUpperCase() || template.state;
    template.documentType = documentType || template.documentType;
    template.basePrice = basePrice || template.basePrice;
    template.convenienceFee = convenienceFee || template.convenienceFee;
    template.description = description !== undefined ? description : template.description;
    template.metadata = metadata || template.metadata;

    await template.save();

    return res.json({
      success: true,
      data: { template },
      message: 'Template updated successfully',
    });
  } catch (error) {
    console.error('Update template error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update template',
    });
  }
};

// Delete template
exports.deleteTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;

    const template = await StampTemplate.findByPk(templateId);
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found',
      });
    }

    // Check if template is being used in any orders
    const orderCount = await StampOrder.count({
      where: { templateId },
    });

    if (orderCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete template: ${orderCount} orders are using this template`,
      });
    }

    await template.destroy();

    return res.json({
      success: true,
      message: 'Template deleted successfully',
    });
  } catch (error) {
    console.error('Delete template error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete template',
    });
  }
};

// Delete ALL stamp templates (bulk delete)
exports.deleteAllTemplates = async (req, res) => {
  try {
    // Get count of templates before deletion
    const templateCount = await StampTemplate.count();

    if (templateCount === 0) {
      return res.json({
        success: true,
        message: 'No templates found to delete',
        deletedCount: 0,
      });
    }

    // Check if any templates are being used in orders
    const templatesInUse = await StampOrder.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('templateId')), 'templateId']],
      where: {
        templateId: { [Op.ne]: null },
      },
      raw: true,
    });

    const templateIdsInUse = templatesInUse.map(t => t.templateId);

    if (templateIdsInUse.length > 0) {
      // Get count of orders using templates
      const orderCount = await StampOrder.count({
        where: {
          templateId: { [Op.in]: templateIdsInUse },
        },
      });

      return res.status(400).json({
        success: false,
        message: `Cannot delete all templates: ${templateIdsInUse.length} templates are being used in ${orderCount} orders`,
        templatesInUse: templateIdsInUse.length,
        totalTemplates: templateCount,
      });
    }

    // Delete all templates
    const deletedCount = await StampTemplate.destroy({
      where: {},
      truncate: false, // Use DELETE instead of TRUNCATE for safety
    });

    console.log(`🗑️  Admin ${req.user.email} deleted ${deletedCount} stamp templates`);

    return res.json({
      success: true,
      message: `Successfully deleted all ${deletedCount} stamp templates`,
      deletedCount,
    });
  } catch (error) {
    console.error('Delete all templates error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete templates',
      error: error.message,
    });
  }
};

// Get all promo codes
exports.getAllPromoCodes = async (req, res) => {
  try {
    const promoCodes = await StampPromoCode.findAll({
      order: [['createdAt', 'DESC']],
    });

    return res.json({
      success: true,
      data: { promoCodes },
    });
  } catch (error) {
    console.error('Get all promo codes error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch promo codes',
    });
  }
};

// Create promo code
exports.createPromoCode = async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      maxDiscount,
      minOrderAmount,
      maxUsageCount,
      validFrom,
      validUntil,
      description,
    } = req.body;

    // Check if code already exists
    const existing = await StampPromoCode.findOne({
      where: { code: code.toUpperCase() },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Promo code already exists',
      });
    }

    const promoCode = await StampPromoCode.create({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      maxDiscount: maxDiscount || null,
      minOrderAmount: minOrderAmount || 0,
      maxUsageCount: maxUsageCount || null,
      usageCount: 0,
      validFrom: validFrom || new Date(),
      validUntil: validUntil || null,
      description: description || null,
      isActive: true,
    });

    return res.status(201).json({
      success: true,
      data: { promoCode },
      message: 'Promo code created successfully',
    });
  } catch (error) {
    console.error('Create promo code error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create promo code',
    });
  }
};

// Update promo code
exports.updatePromoCode = async (req, res) => {
  try {
    const { promoId } = req.params;
    const updates = req.body;

    const promoCode = await StampPromoCode.findByPk(promoId);
    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: 'Promo code not found',
      });
    }

    Object.keys(updates).forEach((key) => {
      if (key !== 'id' && key !== 'usageCount' && updates[key] !== undefined) {
        promoCode[key] = updates[key];
      }
    });

    await promoCode.save();

    return res.json({
      success: true,
      data: { promoCode },
      message: 'Promo code updated successfully',
    });
  } catch (error) {
    console.error('Update promo code error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update promo code',
    });
  }
};

// Delete promo code
exports.deletePromoCode = async (req, res) => {
  try {
    const { promoId } = req.params;

    const promoCode = await StampPromoCode.findByPk(promoId);
    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: 'Promo code not found',
      });
    }

    await promoCode.destroy();

    return res.json({
      success: true,
      message: 'Promo code deleted successfully',
    });
  } catch (error) {
    console.error('Delete promo code error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete promo code',
    });
  }
};

// Get statistics
exports.getStatistics = async (req, res) => {
  try {
    const totalOrders = await StampOrder.count();
    const totalRevenue = await StampOrder.sum('totalAmount', {
      where: { status: ['payment_verified', 'generating', 'generated', 'delivered'] },
    });

    const ordersByStatus = await StampOrder.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      group: ['status'],
    });

    const recentOrders = await StampOrder.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['email'],
        },
      ],
    });

    const topStates = await StampOrder.findAll({
      attributes: [
        'state',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      group: ['state'],
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
      limit: 10,
    });

    return res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue: totalRevenue || 0,
        ordersByStatus,
        recentOrders,
        topStates,
      },
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
    });
  }
};
