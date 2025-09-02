import api from './index'

export const reviewAPI = {
  getReviews: (lawyerId) => api.get(`/reviews/lawyer/${lawyerId}`),
  createReview: (data) => api.post('/reviews', data),
  getClientReviews: () => api.get('/reviews/client'),
  updateReview: (id, data) => api.put(`/reviews/${id}`, data),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
}
