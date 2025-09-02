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
  timeout: 10000, // 10 second timeout
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
    const response = await axios.get(`${API_BASE_URL}/api/auth/csrf-token`, {
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
      // For 401 errors, user session has expired
      const currentPath = window.location.pathname
      
      // Don't automatically logout during auth flow
      if (originalRequest.url?.includes('/auth/')) {
        return Promise.reject(error)
      }
      
      // Give a grace period for fresh logins (don't logout immediately)
      const lastLoginTime = sessionStorage.getItem('lastLoginTime')
      const now = Date.now()
      if (lastLoginTime && (now - parseInt(lastLoginTime)) < 5000) {
        // Within 5 seconds of login, just reject without logout
        return Promise.reject(error)
      }
      
      // Don't show toast for auth endpoints
      if (!originalRequest.url?.includes('/auth/')) {
        toast.error('Your session has expired. Please login again.')
      }
      
      // Clear auth state
      store.dispatch(logout())
      
      // Redirect to login if not already on login page
      if (currentPath !== '/login' && currentPath !== '/') {
        window.location.href = '/login'
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
