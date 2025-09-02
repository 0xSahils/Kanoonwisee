const crypto = require('crypto');
const UserSession = require('../models/userSession.model');
const { Op } = require('sequelize');

/**
 * Session management service for handling user sessions and refresh tokens
 */
class SessionService {
  /**
   * Create a new session for a user
   * @param {String} userId - User ID
   * @param {String} refreshToken - Refresh token
   * @param {String} ipAddress - Client IP address
   * @param {String} userAgent - User agent string
   * @returns {Object} Created session
   */
  static async createSession(userId, refreshToken, ipAddress = null, userAgent = null) {
    try {
      // Hash the refresh token for security
      const refreshTokenHash = crypto
        .createHash('sha256')
        .update(refreshToken)
        .digest('hex');

      // Set expiration date (7 days from now)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      // Generate a unique session ID
      const sessionId = crypto.randomUUID();

      // Create session record
      const session = await UserSession.create({
        session_id: sessionId,
        user_id: userId,
        refresh_token_hash: refreshTokenHash,
        ip_address: ipAddress,
        user_agent: userAgent,
        expires_at: expiresAt,
        last_used: new Date(),
        is_active: true
      });

      return {
        sessionId: session.session_id,
        ...session.toJSON()
      };
    } catch (error) {
      console.error('Error creating session:', error);
      throw new Error('Failed to create session');
    }
  }

  /**
   * Get session by refresh token
   * @param {String} refreshToken - Refresh token
   * @returns {Object|null} Session if found, null otherwise
   */
  static async getSessionByToken(refreshToken) {
    try {
      const refreshTokenHash = crypto
        .createHash('sha256')
        .update(refreshToken)
        .digest('hex');

      const session = await UserSession.findOne({
        where: {
          refresh_token_hash: refreshTokenHash,
          is_active: true,
          expires_at: {
            [Op.gt]: new Date()
          }
        }
      });

      if (session) {
        // Update last used timestamp
        await session.update({
          last_used: new Date()
        });
      }

      return session;
    } catch (error) {
      console.error('Error getting session by token:', error);
      return null;
    }
  }

  /**
   * Update session with new refresh token
   * @param {String} sessionId - Session ID
   * @param {String} newRefreshToken - New refresh token
   * @returns {Boolean} Success status
   */
  static async updateSession(sessionId, newRefreshToken) {
    try {
      const newTokenHash = crypto
        .createHash('sha256')
        .update(newRefreshToken)
        .digest('hex');

      const result = await UserSession.update(
        {
          refresh_token_hash: newTokenHash,
          last_used: new Date()
        },
        {
          where: {
            session_id: sessionId,
            is_active: true
          }
        }
      );

      return result[0] > 0;
    } catch (error) {
      console.error('Error updating session:', error);
      return false;
    }
  }

  /**
   * Remove session by refresh token
   * @param {String} refreshToken - Refresh token
   * @returns {Boolean} Success status
   */
  static async removeSessionByToken(refreshToken) {
    try {
      const refreshTokenHash = crypto
        .createHash('sha256')
        .update(refreshToken)
        .digest('hex');

      const result = await UserSession.update(
        { is_active: false },
        {
          where: {
            refresh_token_hash: refreshTokenHash
          }
        }
      );

      return result[0] > 0;
    } catch (error) {
      console.error('Error removing session by token:', error);
      return false;
    }
  }

  /**
   * Validate and retrieve session by refresh token
   * @param {String} refreshToken - Refresh token to validate
   * @returns {Object|null} Session if valid, null otherwise
   */
  static async validateSession(refreshToken) {
    try {
      const refreshTokenHash = crypto
        .createHash('sha256')
        .update(refreshToken)
        .digest('hex');

      const session = await UserSession.findOne({
        where: {
          refresh_token_hash: refreshTokenHash,
          is_active: true,
          expires_at: {
            [Op.gt]: new Date()
          }
        },
        include: ['User']
      });

      if (session) {
        // Update last used timestamp
        await session.update({
          last_used: new Date()
        });
      }

      return session;
    } catch (error) {
      console.error('Error validating session:', error);
      return null;
    }
  }

  /**
   * Invalidate a specific session
   * @param {String} refreshToken - Refresh token of session to invalidate
   * @returns {Boolean} Success status
   */
  static async invalidateSession(refreshToken) {
    try {
      const refreshTokenHash = crypto
        .createHash('sha256')
        .update(refreshToken)
        .digest('hex');

      const result = await UserSession.update(
        { is_active: false },
        {
          where: {
            refresh_token_hash: refreshTokenHash
          }
        }
      );

      return result[0] > 0;
    } catch (error) {
      console.error('Error invalidating session:', error);
      return false;
    }
  }

  /**
   * Invalidate all sessions for a user
   * @param {String} userId - User ID
   * @returns {Number} Number of sessions invalidated
   */
  static async invalidateAllSessions(userId) {
    try {
      const result = await UserSession.update(
        { is_active: false },
        {
          where: {
            user_id: userId,
            is_active: true
          }
        }
      );

      return result[0];
    } catch (error) {
      console.error('Error invalidating all sessions:', error);
      return 0;
    }
  }

  /**
   * Clean up expired sessions
   * @returns {Number} Number of sessions cleaned up
   */
  static async cleanupExpiredSessions() {
    try {
      const result = await UserSession.destroy({
        where: {
          expires_at: {
            [Op.lt]: new Date()
          }
        }
      });

      console.log(`Cleaned up ${result} expired sessions`);
      return result;
    } catch (error) {
      console.error('Error cleaning up expired sessions:', error);
      return 0;
    }
  }

  /**
   * Get active sessions for a user
   * @param {String} userId - User ID
   * @returns {Array} Array of active sessions
   */
  static async getUserSessions(userId) {
    try {
      const sessions = await UserSession.findAll({
        where: {
          user_id: userId,
          is_active: true,
          expires_at: {
            [Op.gt]: new Date()
          }
        },
        attributes: ['id', 'device_info', 'ip_address', 'last_used', 'created_at'],
        order: [['last_used', 'DESC']]
      });

      return sessions;
    } catch (error) {
      console.error('Error getting user sessions:', error);
      return [];
    }
  }

  /**
   * Update session with new refresh token (token rotation)
   * @param {String} oldRefreshToken - Current refresh token
   * @param {String} newRefreshToken - New refresh token
   * @returns {Boolean} Success status
   */
  static async rotateRefreshToken(oldRefreshToken, newRefreshToken) {
    try {
      const oldTokenHash = crypto
        .createHash('sha256')
        .update(oldRefreshToken)
        .digest('hex');

      const newTokenHash = crypto
        .createHash('sha256')
        .update(newRefreshToken)
        .digest('hex');

      const result = await UserSession.update(
        {
          refresh_token_hash: newTokenHash,
          last_used: new Date()
        },
        {
          where: {
            refresh_token_hash: oldTokenHash,
            is_active: true
          }
        }
      );

      return result[0] > 0;
    } catch (error) {
      console.error('Error rotating refresh token:', error);
      return false;
    }
  }

  /**
   * Get session statistics for a user
   * @param {String} userId - User ID
   * @returns {Object} Session statistics
   */
  static async getSessionStats(userId) {
    try {
      const [activeCount, totalCount] = await Promise.all([
        UserSession.count({
          where: {
            user_id: userId,
            is_active: true,
            expires_at: {
              [Op.gt]: new Date()
            }
          }
        }),
        UserSession.count({
          where: {
            user_id: userId
          }
        })
      ]);

      return {
        active: activeCount,
        total: totalCount
      };
    } catch (error) {
      console.error('Error getting session stats:', error);
      return { active: 0, total: 0 };
    }
  }
}

module.exports = SessionService;
