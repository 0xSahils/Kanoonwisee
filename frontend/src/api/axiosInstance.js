import axios from 'axios'
import toast from 'react-hot-toast'
import { store } from '../store'
import { logout } from '../store/slices/authSlice'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Create axios instance with cookie support
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 🍪 Enable cookie support
  timeout: 60000, // 60 second timeout (increased for file uploads)
})

// CSRF Token management
let csrfToken = null

/**
 * Get CSRF token from cookie or fetch from server
 */
const getCsrfToken = async () => {
  // Try to get token from cookie first
  const cookieToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrfToken='))
    ?.split('=')[1]

  if (cookieToken) {
    csrfToken = cookieToken
    return cookieToken
  }

  // If no cookie token, fetch from server
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/csrf-token`, {
      withCredentials: true
    })
    csrfToken = response.data.csrfToken
    return csrfToken
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error)
    return null
  }
}

/**
 * Check if request needs CSRF protection
 */
const needsCsrfProtection = (config) => {
  const method = config.method?.toLowerCase()
  return ['post', 'put', 'patch', 'delete'].includes(method)
}

// Request interceptor to add CSRF token for state-changing requests
axiosInstance.interceptors.request.use(
  async (config) => {
    // Add CSRF token for state-changing requests
    if (needsCsrfProtection(config)) {
      const token = await getCsrfToken()
      if (token) {
        config.headers['X-CSRF-Token'] = token
      }
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors and authentication
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Handle CSRF token errors
    if (error.response?.status === 403 && 
        error.response?.data?.message?.includes('CSRF')) {
      
      // Clear cached CSRF token and retry once
      if (!originalRequest._csrfRetry) {
        originalRequest._csrfRetry = true
        csrfToken = null // Clear cached token
        
        try {
          const token = await getCsrfToken()
          if (token) {
            originalRequest.headers['X-CSRF-Token'] = token
            return axiosInstance(originalRequest)
          }
        } catch (csrfError) {
          console.error('CSRF token retry failed:', csrfError)
        }
      }
      
      toast.error('Security validation failed. Please try again.')
      return Promise.reject(error)
    }

    // Handle authentication errors
    if (error.response?.status === 401) {
      // For 401 errors, try to refresh token first before logging out
      const currentPath = window.location.pathname
      
      // Don't try to refresh during auth flow - just reject the error
      if (originalRequest.url?.includes('/auth/') || 
          originalRequest.url?.includes('/verify-otp') || 
          originalRequest.url?.includes('/request-otp')) {
        return Promise.reject(error)
      }
      
      // Don't retry if this is already a refresh attempt
      if (originalRequest.url?.includes('/refresh') || originalRequest._retry) {
        // Refresh failed, logout user
        toast.error('Your session has expired. Please login again.')
        store.dispatch(logout())
        
        if (currentPath !== '/login' && currentPath !== '/') {
          window.location.href = '/login'
        }
        
        return Promise.reject(error)
      }
      
      // Try to refresh the access token
      if (!originalRequest._retry) {
        originalRequest._retry = true
        
        try {
          // Call the refresh token endpoint
          await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
            withCredentials: true
          })
          
          console.log('Token refreshed successfully')
          
          // Retry the original request
          return axiosInstance(originalRequest)
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError)
          
          // Refresh failed, logout user
          toast.error('Your session has expired. Please login again.')
          store.dispatch(logout())
          
          if (currentPath !== '/login' && currentPath !== '/') {
            window.location.href = '/login'
          }
          
          return Promise.reject(error)
        }
      }
      
      return Promise.reject(error)
    }

    // Handle other error cases
    if (error.response?.status === 403) {
      toast.error('Access denied')
    } else if (error.response?.status === 429) {
      toast.error('Too many requests. Please try again later.')
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.')
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please try again.')
    } else if (!error.response) {
      toast.error('Network error. Please check your connection.')
    }
    
    return Promise.reject(error)
  }
)

// Utility functions for CSRF management
export const refreshCsrfToken = async () => {
  csrfToken = null
  return await getCsrfToken()
}

export const clearCsrfToken = () => {
  csrfToken = null
}

export default axiosInstance
