import logger from './logger';

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
