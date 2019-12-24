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

export const validateModelItem = (model) => throwInternalError(async (req, res, next) => {
  const result = await model.findOne({ _id: req.params.id, isDeleted: false });
  if (_.isNil(result)) {
    errorHandler(next, { code: 404 });
  } else {
    req.model = result;
    next();
  }
});
