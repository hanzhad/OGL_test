import logger from './logger';

/**
 * Middleware that throw and sent error to client
 *
 * @param handler {Function}
 * @param name? {string} - name of handler
 * @returns {Function}
 */
export default (handler, name) => async (req, res, next) => {
  try {
    return await handler(req, res, next);
  } catch (error) {
    if (name || handler.name) {
      logger.error('In %s', name || handler.name);
    }
    logger.error('%s', error.stack);

    return next({ code: 500, message: 'Ops... Something went wrong. Try later.' });
  }
};
