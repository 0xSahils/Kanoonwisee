/**
 * Utility functions for token management with HttpOnly cookies
 */

/**
 * Decode JWT token payload without verification
 * @param {string} token - JWT token to decode
 * @returns {object|null} - Decoded payload or null if invalid
 */
export const decodeToken = (token) => {
  try {
    if (!token) return null
    
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

/**
 * Check if token is expired
 * @param {string} token - JWT token to check
 * @returns {boolean} - True if token is expired
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = decodeToken(token)
    if (!decoded || !decoded.exp) return true
    
    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime
  } catch {
    return true
  }
}

/**
 * Check if token will expire soon (within 5 minutes)
 * @param {string} token - JWT token to check
 * @returns {boolean} - True if token expires soon
 */
export const isTokenExpiringSoon = (token) => {
  try {
    const decoded = decodeToken(token)
    if (!decoded || !decoded.exp) return true
    
    const currentTime = Date.now() / 1000
    const fiveMinutesFromNow = currentTime + (5 * 60) // 5 minutes in seconds
    
    return decoded.exp < fiveMinutesFromNow
  } catch {
    return true
  }
}

/**
 * Get token expiration time
 * @param {string} token - JWT token
 * @returns {Date|null} - Expiration date or null if invalid
 */
export const getTokenExpiration = (token) => {
  try {
    const decoded = decodeToken(token)
    if (!decoded || !decoded.exp) return null
    
    return new Date(decoded.exp * 1000)
  } catch {
    return null
  }
}

/**
 * Clear all legacy authentication data from localStorage
 * This function is kept for cleanup purposes only
 */
export const clearLegacyAuthData = () => {
  // Clear all legacy localStorage keys
  const legacyKeys = ['token', 'refreshToken', 'user', 'authTimestamp', 'accessToken']
  
  legacyKeys.forEach(key => {
    localStorage.removeItem(key)
  })
  
  // Also clear any other auth-related localStorage
  Object.keys(localStorage).forEach(key => {
    if (key.toLowerCase().includes('auth') || key.toLowerCase().includes('token')) {
      localStorage.removeItem(key)
    }
  })
  
  console.log('✅ Legacy localStorage auth data cleared')
}

/**
 * Get CSRF token from cookies
 * @returns {string|null} - CSRF token or null if not found
 */
export const getCsrfToken = () => {
  try {
    const cookies = document.cookie.split(';')
    const csrfCookie = cookies.find(cookie => 
      cookie.trim().startsWith('csrfToken=')
    )
    return csrfCookie ? csrfCookie.split('=')[1] : null
  } catch (error) {
    console.error('Error getting CSRF token:', error)
    return null
  }
}

/**
 * Check if user is authenticated by checking for auth cookies
 * Note: This is a basic check - actual auth state should come from Redux
 * @returns {boolean} - True if auth cookies appear to be present
 */
export const hasAuthCookies = () => {
  try {
    const cookies = document.cookie
    return cookies.includes('accessToken=') || cookies.includes('refreshToken=')
  } catch (error) {
    console.error('Error checking auth cookies:', error)
    return false
  }
}
