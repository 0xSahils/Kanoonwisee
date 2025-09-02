/**
 * Utility functions for cookie-based authentication
 */

/**
 * Check if user is authenticated by checking session cookie
 * @returns {boolean} - True if session cookie exists
 */
export const isAuthenticated = () => {
  return document.cookie
    .split('; ')
    .some(cookie => cookie.startsWith('kanoonwise.sid='))
}

/**
 * Get CSRF token from cookie
 * @returns {string|null} - CSRF token or null if not found
 */
export const getCsrfTokenFromCookie = () => {
  const csrfCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrfToken='))
  
  return csrfCookie ? csrfCookie.split('=')[1] : null
}

/**
 * Clear all authentication-related cookies
 * This is primarily for cleanup, actual logout should use API
 */
export const clearAuthCookies = () => {
  // Note: Due to httpOnly nature of session cookies,
  // we can only clear non-httpOnly cookies from client side
  const cookiesToClear = ['csrfToken']
  
  cookiesToClear.forEach(cookieName => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`
  })
}

/**
 * Clear all authentication data from localStorage
 * This removes any legacy token data that might exist
 */
export const clearLegacyAuthData = () => {
  const keysToRemove = [
    'token',
    'refreshToken', 
    'user',
    'authTimestamp'
  ]
  
  keysToRemove.forEach(key => {
    localStorage.removeItem(key)
  })
  
  // Also clear any other auth-related localStorage
  Object.keys(localStorage).forEach(key => {
    if (key.includes('auth') || key.includes('token')) {
      localStorage.removeItem(key)
    }
  })
}

/**
 * Extract user info from a potential response
 * Helper function for auth state management
 */
export const extractUserInfo = (response) => {
  if (response?.data?.user) {
    return response.data.user
  }
  if (response?.user) {
    return response.user
  }
  return null
}

/**
 * Check if the current page requires authentication
 * @param {string} pathname - Current page path
 * @returns {boolean} - True if page requires authentication
 */
export const requiresAuth = (pathname) => {
  const publicRoutes = [
    '/',
    '/login',
    '/signup', 
    '/forgot-password',
    '/legal-services',
    '/legal-insights',
    '/legal-faqs',
    '/legal-calculators',
    '/kanoonwise-academy'
  ]
  
  // Check if current path is public
  return !publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )
}

/**
 * Validate session on app startup
 * @returns {Promise<boolean>} - True if session is valid
 */
export const validateSession = async () => {
  try {
    // Check if we have a session cookie
    if (!isAuthenticated()) {
      return false
    }
    
    // The session will be validated by the backend automatically
    // when we make authenticated requests
    return true
  } catch (error) {
    console.error('Session validation failed:', error)
    return false
  }
}

/**
 * Get authentication status for display purposes
 * @returns {object} - Auth status information
 */
export const getAuthStatus = () => {
  const hasSessionCookie = isAuthenticated()
  const hasCsrfToken = !!getCsrfTokenFromCookie()
  
  return {
    hasSessionCookie,
    hasCsrfToken,
    isLikelyAuthenticated: hasSessionCookie,
    needsTokenRefresh: hasSessionCookie && !hasCsrfToken
  }
}
