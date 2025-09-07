import axiosInstance from './axiosInstance'

export const adminAPI = {
  getPendingLawyers: async () => {
    const response = await axiosInstance.get('/admin/lawyers/pending')
    return response.data
  },

  updateLawyerStatus: async (id, status) => {
    const response = await axiosInstance.put(`/admin/lawyers/${id}/status`, { status })
    return response.data
  },

  getLawyerDocumentUrl: async (id, documentType) => {
    const response = await axiosInstance.get(`/admin/lawyers/${id}/document?documentType=${documentType}`)
    return response.data
  }
}
