const { ERROR_FORBIDDEN } = require('../codes/codes');

class ErrorForbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_FORBIDDEN;
  }
}

module.exports = ErrorForbidden;
