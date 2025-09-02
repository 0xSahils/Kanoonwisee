/**
 * Cookie configuration utilities for secure authentication
 */

const config = {
  development: {
    secure: false,
    // Don't set domain in development to allow cross-port cookie sharing
    sameSite: 'lax'
  },
  production: {
    secure: true,
    domain: process.env.COOKIE_DOMAIN,
    sameSite: 'strict'
  }
};

const environment = process.env.NODE_ENV || 'development';
const cookieConfig = config[environment];

/**
 * Access token cookie configuration (short-lived)
 */
const accessTokenCookieOptions = {
  httpOnly: true,
  secure: cookieConfig.secure,
  sameSite: cookieConfig.sameSite,
  maxAge: 15 * 60 * 1000, // 15 minutes
  path: '/',
  ...(cookieConfig.domain && { domain: cookieConfig.domain })
};

/**
 * Refresh token cookie configuration (long-lived)
 * Note: Path is set to '/' to make the refresh token available on all routes,
 * allowing the frontend to automatically refresh tokens on any page reload
 * or when making authenticated requests from any part of the application.
 */
const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: cookieConfig.secure,
  sameSite: cookieConfig.sameSite,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/', // Available on all routes for automatic token refresh
  ...(cookieConfig.domain && { domain: cookieConfig.domain })
};

/**
 * CSRF token cookie configuration
 */
const csrfTokenCookieOptions = {
  httpOnly: false, // Accessible to JavaScript for CSRF headers
  secure: cookieConfig.secure,
  sameSite: cookieConfig.sameSite,
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  path: '/',
  ...(cookieConfig.domain && { domain: cookieConfig.domain })
};

/**
 * Set authentication cookies
 * @param {Object} res - Express response object
 * @param {String} accessToken - JWT access token
 * @param {String} refreshToken - JWT refresh token
 */
const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie('accessToken', accessToken, accessTokenCookieOptions);
  res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);
};

/**
 * Clear authentication cookies
 * @param {Object} res - Express response object
 */
const clearAuthCookies = (res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: cookieConfig.secure,
    sameSite: cookieConfig.sameSite,
    path: '/',
    ...(cookieConfig.domain && { domain: cookieConfig.domain })
  });
  
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: cookieConfig.secure,
    sameSite: cookieConfig.sameSite,
    path: '/', // Updated to match the refresh token cookie path
    ...(cookieConfig.domain && { domain: cookieConfig.domain })
  });
  
  res.clearCookie('csrfToken', {
    secure: cookieConfig.secure,
    sameSite: cookieConfig.sameSite,
    path: '/',
    ...(cookieConfig.domain && { domain: cookieConfig.domain })
  });
};

/**
 * Set CSRF token cookie
 * @param {Object} res - Express response object
 * @param {String} csrfToken - CSRF token
 */
const setCsrfCookie = (res, csrfToken) => {
  res.cookie('csrfToken', csrfToken, csrfTokenCookieOptions);
};

module.exports = {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  csrfTokenCookieOptions,
  setAuthCookies,
  clearAuthCookies,
  setCsrfCookie,
  cookieConfig
};
