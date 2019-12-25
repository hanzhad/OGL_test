import express from 'express';
import { body, param } from 'express-validator';
import { Types } from 'mongoose';
import _ from 'lodash';
import {
  getById, update, deleteById, getAll, create,
} from '../controllers/baseCRUD';
import Recipe from '../models/Recipe';
import { validateModelIdFromReq, validate } from '../utils/middlewares';
import Category from '../models/Category';
import { getByCategoryId } from '../controllers/Recipe';

const router = express.Router();

router
  .route('/')
  .get(getAll(Recipe))
  .post([
    body('title').trim().isString().notEmpty(),
    body('categoryId').custom(Types.ObjectId.isValid),
    body('text').optional().trim().isString()
      .notEmpty(),
    validate,
    validateModelIdFromReq(Category, 'model', 'body', 'categoryId'),
  ], create(Recipe));

router
  .route('/:id')
  .get([
    param('id'),
    validate,
    validateModelIdFromReq(Recipe),
  ], getById,)
  .put([
    param('id').custom(Types.ObjectId.isValid),
    body('title').optional().trim().isString()
      .notEmpty(),
    body('isDeleted').optional().isBoolean(),
    body('categoryId').optional().custom((v) => _.isNull(v) || Types.ObjectId.isValid(v)),
    body('text').optional().trim().isString()
      .notEmpty(),
    validate,
    validateModelIdFromReq(Recipe),
    validateModelIdFromReq(Category, 'modelCategory', 'body', 'categoryId', true),
  ], update(Recipe))
  .delete([
    param('id').custom(Types.ObjectId.isValid),
    validate,
    validateModelIdFromReq(Recipe),
  ], deleteById(Recipe));

router
  .route('/list/:id')
  .get([
    param('id').custom(Types.ObjectId.isValid),
    validate,
    validateModelIdFromReq(Category),
  ], getByCategoryId);

export default router;
