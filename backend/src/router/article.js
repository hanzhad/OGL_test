import express from 'express';
import { body, param } from 'express-validator';
import { Types } from 'mongoose';
import _ from 'lodash';
import {
  getByCategoryId,
} from '../controllers/Article';
import {
  getById, update, deleteById, getAll, create,
} from '../controllers/baseCRUD';
import { validate, validateModelIdFromReq } from '../utils/middlewares';
import Category from '../models/Category';
import Article from '../models/Article';

const router = express.Router();

router
  .route('/')
  .get(getAll(Article))
  .post([
    body('title').trim().isString().notEmpty(),
    body('description').optional().trim().isString()
      .notEmpty(),
    body('categoryId').custom(Types.ObjectId.isValid),
    body('text').optional().trim().isString()
      .notEmpty(),
    validate,
    validateModelIdFromReq(Category, 'model', 'body', 'categoryId'),
  ], create(Article));

router
  .route('/:id')
  .get([
    param('id'),
    validate,
    validateModelIdFromReq(Article),
  ], getById,)
  .put([
    param('id').custom(Types.ObjectId.isValid),
    body('title').optional().trim().isString()
      .notEmpty(),
    body('description').optional().trim().isString()
      .notEmpty(),
    body('isDeleted').optional().isBoolean(),
    body('categoryId').optional().custom((v) => _.isNull(v) || Types.ObjectId.isValid(v)),
    body('text').optional().trim().isString()
      .notEmpty(),
    validate,
    validateModelIdFromReq(Article),
    validateModelIdFromReq(Category, 'modelCategory', 'body', 'categoryId', true),
  ], update(Article))
  .delete([
    param('id').custom(Types.ObjectId.isValid),
    validate,
    validateModelIdFromReq(Article),
  ], deleteById(Article));

router
  .route('/list/:id')
  .get([
    param('id').custom(Types.ObjectId.isValid),
    validate,
    validateModelIdFromReq(Category),
  ], getByCategoryId);

export default router;
