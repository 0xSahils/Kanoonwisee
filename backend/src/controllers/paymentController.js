const paymentService = require("../services/paymentService");

const createOrder = async (req, res, next) => {
  try {
    const { packageId } = req.body;
    const userId = req.user.id; // From auth middleware

    const orderData = await paymentService.createOrder(packageId, userId);
    
    res.status(201).json({
      message: "Order created successfully",
      data: orderData,
    });
  } catch (error) {
    next(error);
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    const userId = req.user.id; // From auth middleware

    const verificationResult = await paymentService.verifyPayment(
      orderId,
      paymentId,
      signature,
      userId
    );

    if (verificationResult.success) {
      res.status(200).json({
        message: "Payment verified successfully",
        data: verificationResult.order,
      });
    } else {
      res.status(400).json({
        message: "Payment verification failed",
        error: verificationResult.error,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getPackages = async (req, res, next) => {
  try {
    const packages = await paymentService.getActivePackages();
    
    res.status(200).json({
      message: "Packages retrieved successfully",
      data: packages,
    });
  } catch (error) {
    next(error);
  }
};

const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user.id; // From auth middleware
    const { status } = req.query;

    const orders = await paymentService.getUserOrders(userId, status);
    
    res.status(200).json({
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderDetails = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id; // From auth middleware

    const order = await paymentService.getOrderDetails(orderId, userId);
    
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order details retrieved successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const handleWebhook = async (req, res, next) => {
  try {
    const webhookSignature = req.headers['x-razorpay-signature'];
    const webhookBody = req.body;

    const result = await paymentService.handleWebhook(webhookBody, webhookSignature);
    
    if (result.success) {
      res.status(200).json({ message: "Webhook processed successfully" });
    } else {
      res.status(400).json({ message: "Webhook verification failed" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getPackages,
  getUserOrders,
  getOrderDetails,
  handleWebhook,
};