/**
 * Error handler.
 * <p>
 *     Gives error status code and error message to closingHandler.
 * </p>
 * @param next
 * @param code
 * @param message
 */
export default (next, code = 500, message) => {
  switch (code) {
  case 400: {
    next({ code: 400, message: message || 'Sent data is not valid' });
    break;
  }
  case 401: {
    next({ code: 401, message: message || 'Unauthorized' });
    break;
  }
  case 403: {
    next({ code: 403, message: message || 'Access denied' });
    break;
  }
  case 404: {
    next({ code: 404, message: message || 'Information not found' });
    break;
  }
  case 415: {
    next({ code: 415, message: message || 'Unsupported media type' });
    break;
  }
  default: {
    next({ code: code || 500, message: message || 'Ops... Something went wrong. Try later.' });
  }
  }
};
