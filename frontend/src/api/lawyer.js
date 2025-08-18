import api from './index'

export const lawyerAPI = {
  getProfile: () => api.get('/lawyer/profile'),
  updateProfile: (data) => api.put('/lawyer/profile', data),
  getAppointments: () => api.get('/lawyer/appointments'),
  updateAppointmentStatus: (appointmentId, status) => 
    api.patch(`/lawyer/appointments/respond`, { appointmentId, status }),
  getStats: () => api.get('/lawyer/stats'),
}
