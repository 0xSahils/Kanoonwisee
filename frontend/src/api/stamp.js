import axiosInstance from './axiosInstance';

const BASE_URL = '/stamps';

export const getStates = () => {
  return axiosInstance.get(`${BASE_URL}/states`);
};

export const getTemplatesByState = (state) => {
  return axiosInstance.get(`${BASE_URL}/templates/${state}`);
};

export const getPromoCodes = () => {
  return axiosInstance.get(`${BASE_URL}/promo-codes`);
};

export const createDraftOrder = (orderData) => {
  return axiosInstance.post(`${BASE_URL}/orders`, orderData);
};

export const updateServiceSelection = (orderId, serviceData) => {
  return axiosInstance.patch(`${BASE_URL}/orders/${orderId}/service`, serviceData);
};

export const validatePromoCode = (orderId, promoData) => {
  return axiosInstance.post(`${BASE_URL}/orders/${orderId}/validate-promo`, promoData);
};

export const createPaymentOrder = (orderId) => {
  return axiosInstance.post(`${BASE_URL}/orders/${orderId}/payment`);
};

export const verifyPayment = (orderId, paymentData) => {
  return axiosInstance.post(`${BASE_URL}/orders/${orderId}/verify-payment`, paymentData);
};

export const getOrderDetails = (orderId) => {
  return axiosInstance.get(`${BASE_URL}/orders/${orderId}`);
};

export const verifyStamp = (verificationHash) => {
  return axiosInstance.get(`${BASE_URL}/verify/${verificationHash}`);
};

// Admin APIs
export const getAllOrders = (params) => {
  return axiosInstance.get(`${BASE_URL}/admin/orders`, { params });
};

export const revokeStamp = (orderId, reason) => {
  return axiosInstance.patch(`${BASE_URL}/admin/orders/${orderId}/revoke`, { reason });
};
