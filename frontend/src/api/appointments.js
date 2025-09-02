import api from './index'

export const appointmentAPI = {
  getAppointments: () => api.get('/appointments'),
  cancelAppointment: (id) => api.patch(`/appointments/${id}/cancel`),
  // Note: Other appointment operations are handled through lawyer/client specific routes
  // createAppointment is handled via clientAPI.bookAppointment
  // updateAppointment status is handled via lawyerAPI.updateAppointmentStatus
}
