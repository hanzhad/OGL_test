import { validationResult } from 'express-validator';
import _ from 'lodash';
import { errorHandler } from './errorHandler';
import throwInternalError from './throwInternalError';

/**
 * Handle errors from express-validator and throw errors to client
 *
 * @param req
 * @param res
 * @param next
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorHandler(next, { code: 400, errors: errors.array() });
  } else {
    next();
  }
};

/**
 * Checks for a row in the specified model. Throws error to client.
 *
 * @param model
 * @param objectName? {string} - name of created object
 * @param type? {string} - name of checked object
 * @param value? {string} - name of checked value in selected object
 * @param isOptional? {boolean}
 * @returns {Function}
 */
export const validateModelIdFromReq = (model, objectName = 'model', type = 'params', value = 'id', isOptional = false) => throwInternalError(async (req, res, next) => {
  const param = _.get(req[type], value);
  let result = {};
  if (!isOptional || param) {
    result = await model.findOne({ _id: param, isDeleted: false });
    if (_.isEmpty(result)) {
      return errorHandler(next, { code: 404 });
    }
  }
  _.set(req, objectName, result);
  return next();
});
