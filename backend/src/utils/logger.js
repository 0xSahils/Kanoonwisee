/**
 * Logging utilities for KanoonWise file upload system
 */

const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

const LOG_COLORS = {
  ERROR: '\x1b[31m', // Red
  WARN: '\x1b[33m',  // Yellow
  INFO: '\x1b[36m',  // Cyan
  DEBUG: '\x1b[37m', // White
  RESET: '\x1b[0m'
};

const LOG_EMOJIS = {
  ERROR: '❌',
  WARN: '⚠️',
  INFO: 'ℹ️',
  DEBUG: '🔍',
  SUCCESS: '✅',
  UPLOAD: '📤',
  DOWNLOAD: '📥',
  DELETE: '🗑️',
  CONNECT: '🔗',
  FILE: '📁',
  S3: '☁️'
};

class Logger {
  constructor(module = 'APP') {
    this.module = module;
    this.level = process.env.LOG_LEVEL || 'INFO';
  }

  _log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const color = LOG_COLORS[level] || LOG_COLORS.INFO;
    const emoji = LOG_EMOJIS[level] || LOG_EMOJIS.INFO;
    
    let logMessage = `${color}${emoji} [${timestamp}] [${this.module}] ${message}${LOG_COLORS.RESET}`;
    
    if (data) {
      logMessage += `\n${JSON.stringify(data, null, 2)}`;
    }
    
    console.log(logMessage);
  }

  error(message, data = null) {
    this._log('ERROR', message, data);
  }

  warn(message, data = null) {
    this._log('WARN', message, data);
  }

  info(message, data = null) {
    this._log('INFO', message, data);
  }

  debug(message, data = null) {
    if (process.env.NODE_ENV === 'development') {
      this._log('DEBUG', message, data);
    }
  }

  success(message, data = null) {
    const timestamp = new Date().toISOString();
    const color = LOG_COLORS.INFO;
    const emoji = LOG_EMOJIS.SUCCESS;
    
    let logMessage = `${color}${emoji} [${timestamp}] [${this.module}] ${message}${LOG_COLORS.RESET}`;
    
    if (data) {
      logMessage += `\n${JSON.stringify(data, null, 2)}`;
    }
    
    console.log(logMessage);
  }

  s3(action, message, data = null) {
    const timestamp = new Date().toISOString();
    const color = LOG_COLORS.INFO;
    const emoji = LOG_EMOJIS.S3;
    
    let logMessage = `${color}${emoji} [${timestamp}] [${this.module}] S3 ${action}: ${message}${LOG_COLORS.RESET}`;
    
    if (data) {
      logMessage += `\n${JSON.stringify(data, null, 2)}`;
    }
    
    console.log(logMessage);
  }

  file(action, filename, size = null) {
    const timestamp = new Date().toISOString();
    const color = LOG_COLORS.INFO;
    const emoji = LOG_EMOJIS.FILE;
    
    let message = `${color}${emoji} [${timestamp}] [${this.module}] File ${action}: ${filename}`;
    if (size) {
      message += ` (${this._formatBytes(size)})`;
    }
    message += LOG_COLORS.RESET;
    
    console.log(message);
  }

  _formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Create module-specific loggers
const createLogger = (module) => new Logger(module);

// Pre-configured loggers
const s3Logger = createLogger('S3');
const uploadLogger = createLogger('UPLOAD');
const authLogger = createLogger('AUTH');
const apiLogger = createLogger('API');

module.exports = {
  Logger,
  createLogger,
  s3Logger,
  uploadLogger,
  authLogger,
  apiLogger,
  LOG_EMOJIS
};
