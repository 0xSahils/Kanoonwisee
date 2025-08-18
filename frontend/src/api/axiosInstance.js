import axios from 'axios'
import toast from 'react-hot-toast'
import { store } from '../store'
import { logout, updateTokens } from '../store/slices/authSlice'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Flag to prevent multiple refresh attempts
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  
  failedQueue = []
}

// Request interceptor to add auth token from Redux store
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const token = state.auth.token
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors and token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If we're already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return axiosInstance(originalRequest)
        }).catch(err => {
          return Promise.reject(err)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      const state = store.getState()
      const refreshToken = state.auth.refreshToken
      
      if (!refreshToken) {
        // No refresh token, redirect to login
        store.dispatch(logout())
        window.location.href = '/login'
        toast.error('Session expired. Please login again.')
        return Promise.reject(error)
      }

      try {
        // Attempt to refresh the token
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken
        })

        const { accessToken, refreshToken: newRefreshToken } = response.data
        
        // Update Redux store with new tokens
        store.dispatch(updateTokens({ 
          accessToken, 
          refreshToken: newRefreshToken 
        }))

        // Update the authorization header for the original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        
        // Process the queue with the new token
        processQueue(null, accessToken)
        
        isRefreshing = false
        
        // Retry the original request
        return axiosInstance(originalRequest)
        
      } catch (refreshError) {
        // Refresh failed, redirect to login
        processQueue(refreshError, null)
        isRefreshing = false
        
        store.dispatch(logout())
        window.location.href = '/login'
        toast.error('Session expired. Please login again.')
        
        return Promise.reject(refreshError)
      }
    }

    // Handle other error cases
    if (error.response?.status === 403) {
      toast.error('Access denied')
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.')
    }
    
    return Promise.reject(error)
  }
)

export default axiosInstance
