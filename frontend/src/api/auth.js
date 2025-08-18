import api from "./index";

export const authAPI = {
  requestOtp: (email, role = "client") =>
    api.post(`/auth/request-otp`, { email, role }),
  verifyOtp: (email, otp) => api.post(`/auth/verify-otp`, { email, otp }),
  refreshToken: (refreshToken) => api.post(`/auth/refresh`, { refreshToken }),
  logout: () => api.post(`/auth/logout`),
};
