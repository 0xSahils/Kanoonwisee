import axiosInstance from './axiosInstance'

export const adminAPI = {
  // Existing lawyer endpoints
  getPendingLawyers: async () => {
    const response = await axiosInstance.get('/admin/lawyers/pending')
    return response.data
  },

  getAllLawyers: async (params = {}) => {
    const queryParams = new URLSearchParams()
    if (params.page) queryParams.append('page', params.page)
    if (params.limit) queryParams.append('limit', params.limit)
    if (params.status) queryParams.append('status', params.status)
    if (params.search) queryParams.append('search', params.search)
    
    const response = await axiosInstance.get(`/admin/lawyers?${queryParams.toString()}`)
    return response.data
  },

  updateLawyerStatus: async (id, status) => {
    const response = await axiosInstance.put(`/admin/lawyers/${id}/status`, { status })
    return response.data
  },

  getLawyerDocumentUrl: async (id, documentType) => {
    const response = await axiosInstance.get(`/admin/lawyers/${id}/document?documentType=${documentType}`)
    return response.data
  },

  // User management endpoints
  getAllUsers: async (params = {}) => {
    const queryParams = new URLSearchParams()
    if (params.page) queryParams.append('page', params.page)
    if (params.limit) queryParams.append('limit', params.limit)
    if (params.role) queryParams.append('role', params.role)
    if (params.search) queryParams.append('search', params.search)
    
    const response = await axiosInstance.get(`/admin/users?${queryParams.toString()}`)
    return response.data
  },

  getUserDetails: async (id) => {
    const response = await axiosInstance.get(`/admin/users/${id}`)
    return response.data
  }
}
