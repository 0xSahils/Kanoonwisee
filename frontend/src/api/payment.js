import axiosInstance from './axiosInstance';

export const paymentAPI = {
  // Get all available packages (authenticated)
  getPackages: () => {
    return axiosInstance.get('/payment/packages');
  },

  // Get public packages (no authentication required)
  getPublicPackages: () => {
    return axiosInstance.get('/public-payment/packages');
  },

  // Create a new order
  createOrder: (packageId) => {
    return axiosInstance.post('/payment/create-order', { packageId });
  },

  // Create public order (no authentication required)
  createPublicOrder: (orderData) => {
    return axiosInstance.post('/public-payment/create-order', orderData);
  },

  // Verify payment
  verifyPayment: (paymentData) => {
    return axiosInstance.post('/payment/verify-payment', paymentData);
  },

  // Verify public payment (no authentication required)
  verifyPublicPayment: (paymentData) => {
    return axiosInstance.post('/public-payment/verify-payment', paymentData);
  },

  // Get user orders
  getUserOrders: (status) => {
    const params = status ? { status } : {};
    return axiosInstance.get('/payment/orders', { params });
  },

  // Get order details
  getOrderDetails: (orderId) => {
    return axiosInstance.get(`/payment/orders/${orderId}`);
  },
};