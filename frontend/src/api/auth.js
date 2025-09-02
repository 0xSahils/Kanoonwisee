import api from "./index";

export const authAPI = {
  // Request OTP for login
  requestOtp: (email, role = "client") =>
    api.post(`/auth/request-otp`, { email, role }),
    
  // Verify OTP and establish session
  verifyOtp: (email, otp) => 
    api.post(`/auth/verify-otp`, { email, otp }),
    
  // Get current user info (using session cookies)
  getCurrentUser: () => 
    api.get(`/auth/me`),
    
  // Logout and clear session
  logout: () => 
    api.post(`/auth/logout`),
    
  // Get CSRF token
  getCsrfToken: () =>
    api.get(`/auth/csrf-token`),
};
