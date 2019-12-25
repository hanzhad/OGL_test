import { validationResult } from 'express-validator';
import _ from 'lodash';
import { errorHandler } from './errorHandler';
import throwInternalError from './throwInternalError';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorHandler(next, { code: 400, errors: errors.array() });
  } else {
    next();
  }
};

export const validateModelIdFromReq = (model, type = 'params', value = 'id', isOptional = false) => throwInternalError(async (req, res, next) => {
  const param = _.get(req[type], value);
  let result = {};
  if (!isOptional || param) {
    result = await model.findOne({ _id: param, isDeleted: false });
    if (_.isEmpty(result)) {
      return errorHandler(next, { code: 404 });
    }
  }
  req.model = result;
  return next();
});
