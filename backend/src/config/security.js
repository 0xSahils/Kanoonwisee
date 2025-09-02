const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const csrf = require('csrf');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Database session store for production
const sequelize = require('./database');

/**
 * Security headers configuration
 */
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

/**
 * Rate limiting configurations
 */
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs for auth endpoints
  message: {
    error: 'Too many authentication attempts, please try again later.',
    retryAfter: 15 * 60 // 15 minutes in seconds
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting in development
    return process.env.NODE_ENV === 'development';
  }
});

const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests, please try again later.',
    retryAfter: 15 * 60
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    return process.env.NODE_ENV === 'development';
  }
});

const refreshRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit refresh attempts
  message: {
    error: 'Too many token refresh attempts, please login again.',
    retryAfter: 15 * 60
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    return process.env.NODE_ENV === 'development';
  }
});

/**
 * CORS configuration for cookies
 */
const corsOptions = {
  origin: function (origin, callback) {
    // Development environment - allow specific origins
    if (process.env.NODE_ENV === 'development') {
      const allowedOrigins = [
        process.env.FRONTEND_URL,
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:5174',
      ].filter(Boolean);

      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log(`CORS blocked origin in development: ${origin}`);
        return callback(new Error(`CORS policy violation: ${origin} not allowed`));
      }
    }
    
    // Production environment - more permissive for same-origin deployments
    if (process.env.NODE_ENV === 'production') {
      // Allow requests with no origin (same-origin requests often don't have origin header)
      if (!origin) return callback(null, true);
      
      // Allow production URLs
      const productionOrigins = [
        'https://kanoonwise-li7v.onrender.com',
        process.env.FRONTEND_URL,
      ].filter(Boolean);
      
      // Allow any render.com subdomain for flexibility
      if (origin.includes('.onrender.com') || productionOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      console.log(`CORS blocked origin in production: ${origin}`);
      console.log(`Allowed production origins: ${productionOrigins.join(', ')}`);
      return callback(new Error(`CORS policy violation: ${origin} not allowed`));
    }
    
    // Fallback - allow all in other environments
    callback(null, true);
  },
  credentials: true, // Enable cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'X-Requested-With',
    'X-CSRF-Token' // Allow CSRF token header
  ],
  exposedHeaders: ['X-CSRF-Token'],
  optionsSuccessStatus: 200
};

/**
 * Cookie parser configuration
 */
const cookieParserOptions = {
  signed: false, // We handle JWT signing separately
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true
};

/**
 * CSRF protection setup
 */
const csrfTokens = csrf();

/**
 * Session configuration for CSRF protection
 */
const sessionStore = process.env.NODE_ENV === 'production' 
  ? new SequelizeStore({
      db: sequelize,
      tableName: 'UserSessions',
      checkExpirationInterval: 15 * 60 * 1000, // Check every 15 minutes
      expiration: 24 * 60 * 60 * 1000 // Session expires after 24 hours
    })
  : undefined; // Use default MemoryStore in development

const sessionOptions = {
  name: 'kanoonwise.sid',
  secret: process.env.SESSION_SECRET || 'kanoonwise-csrf-secret-key-2024',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
  }
};

// Initialize the session store table in production
if (sessionStore) {
  sessionStore.sync();
}

module.exports = {
  securityHeaders,
  authRateLimit,
  generalRateLimit,
  refreshRateLimit,
  corsOptions,
  cookieParserOptions,
  sessionOptions,
  csrfTokens
};
