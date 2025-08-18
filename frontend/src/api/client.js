import api from './index'

export const clientAPI = {
  getProfile: () => api.get('/client/profile'),
  updateProfile: (data) => api.put('/client/profile', data),
  getAllLawyers: (params) => api.get('/client/lawyers', { params }),
  searchLawyers: (params) => api.get('/client/lawyers/search', { params }),
  getLawyerDetails: (lawyerId) => api.get(`/client/lawyers/${lawyerId}`),
  bookAppointment: (data) => api.post('/client/book', data),
  getAppointments: () => api.get('/client/appointments'),
  cancelAppointment: (appointmentId) => 
    api.delete(`/client/appointments/${appointmentId}`),
  getStats: () => api.get('/client/stats'),
}
