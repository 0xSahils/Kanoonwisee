/**
 * Utility functions for token management
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
 * Clear all authentication data from localStorage
 */
export const clearAuthData = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')
}

/**
 * Get stored tokens from localStorage
 * @returns {object} - Object containing token and refreshToken
 */
export const getStoredTokens = () => {
  return {
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken')
  }
}

/**
 * Store tokens in localStorage
 * @param {string} token - Access token
 * @param {string} refreshToken - Refresh token
 */
export const storeTokens = (token, refreshToken) => {
  if (token) {
    localStorage.setItem('token', token)
  }
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken)
  }
}
