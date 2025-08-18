import api from './index'

export const appointmentAPI = {
  getAppointments: () => api.get('/appointments'),
  getAppointment: (id) => api.get(`/appointments/${id}`),
  createAppointment: (data) => api.post('/appointments', data),
  updateAppointment: (id, data) => api.put(`/appointments/${id}`, data),
  cancelAppointment: (id) => api.patch(`/appointments/${id}/cancel`),
}
