module.exports = {
  // Pagination defaults
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,

  // User constants
  USER_ROLES: {
    USER: 'user',
    ADMIN: 'admin',
    MODERATOR: 'moderator'
  },

  LOGIN_MODES: {
    EMAIL: 'email',
    GITHUB: 'github'
  },

  // Comment constants
  MAX_COMMENT_LENGTH: 1000,
  MIN_COMMENT_LENGTH: 1,

  // Response messages
  MESSAGES: {
    SUCCESS: 'Operation completed successfully',
    NOT_FOUND: 'Resource not found',
    VALIDATION_ERROR: 'Validation error',
    SERVER_ERROR: 'Internal server error',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden'
  }
};