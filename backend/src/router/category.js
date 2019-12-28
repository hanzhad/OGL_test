import express from 'express';
import { body, param } from 'express-validator';
import _ from 'lodash';
import { Types } from 'mongoose';
import {
  getCategoryList, getChildrenCategories, deleteById,
} from '../controllers/Category';
import { validate, validateModelIdFromReq } from '../utils/middlewares';
import Category from '../models/Category';
import {
  getById, update, getAll, create,
} from '../controllers/baseCRUD';

const router = express.Router();

router
  .route('/:id')
  .get([
    param('id').custom(Types.ObjectId.isValid),
    validate,
    validateModelIdFromReq(Category),
  ], getById)
  .put([
    param('id').custom(Types.ObjectId.isValid),
    body('title').optional().trim().notEmpty()
      .isString(),
    body('isDeleted').optional().isBoolean(),
    body('parentId').optional().custom((v) => _.isNull(v) || Types.ObjectId.isValid(v)),
    validate,
    validateModelIdFromReq(Category),
  ], update(Category))
  .delete([
    param('id').custom(Types.ObjectId.isValid),
    validate,
    validateModelIdFromReq(Category),
  ], deleteById);

router
  .route('/')
  .get(getAll(Category))
  .post([
    body('title').trim().notEmpty().isString(),
    body('parentId').optional().custom((v) => _.isNull(v) || Types.ObjectId.isValid(v)),
    body('isDeleted').optional().isBoolean(),
    validate,
    validateModelIdFromReq(Category, 'parent', 'body', 'parentId', true),
  ], create(Category));

router
  .route('/list/:id')
  .get([
    param('id').custom(Types.ObjectId.isValid),
    validate,
    validateModelIdFromReq(Category),
  ], getCategoryList);

router
  .route('/children/:id')
  .get([
    param('id').custom(Types.ObjectId.isValid),
    validate,
    validateModelIdFromReq(Category),
  ], getChildrenCategories);


export default router;
