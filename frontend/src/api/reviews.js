import api from './index'

export const reviewAPI = {
  getReviews: (lawyerId) => api.get(`/lawyers/${lawyerId}/reviews`),
  createReview: (data) => api.post('/reviews', data),
  getClientReviews: () => api.get('/client/reviews'),
  updateReview: (id, data) => api.put(`/reviews/${id}`, data),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
}
