import express from 'express';
import { body, param } from 'express-validator';
import _ from 'lodash';
import { Types } from 'mongoose';
import {
  create, getAll, getById, getCategoryList, getChildrenCategories, update, deleteById
} from '../controllers/Category';
import { validate, validateModelItem } from '../utils/middlewares';
import Category from '../models/Category';

const router = express.Router();

router
  .route('/:id')
  .get([
    param('id').custom(Types.ObjectId.isValid),
    validate,
    validateModelItem(Category),
  ], getById)
  .put([
    param('id').custom(Types.ObjectId.isValid),
    body('title').optional().trim().notEmpty()
      .isString(),
    body('isDeleted').optional().isBoolean(),
    body('parentId').optional().custom((v) => _.isNull(v) || Types.ObjectId.isValid(v)),
    validate,
    validateModelItem(Category),
  ], update)
  .delete([
    param('id').custom(Types.ObjectId.isValid),
    validate,
    validateModelItem(Category),
  ], deleteById);

router
  .route('/')
  .get(getAll)
  .post([
    body('title').trim().notEmpty().isString(),
    body('parentId').optional().custom((v) => _.isNull(v) || Types.ObjectId.isValid(v)),
    body('isDeleted').optional().isBoolean(),
    validate,
  ], create);

router
  .route('/list/:id')
  .get([
    param('id').custom(Types.ObjectId.isValid),
    validate,
    validateModelItem(Category),
  ], getCategoryList);

router
  .route('/children/:id')
  .get([
    param('id').custom(Types.ObjectId.isValid),
    validate,
    validateModelItem(Category),
  ], getChildrenCategories);


export default router;
