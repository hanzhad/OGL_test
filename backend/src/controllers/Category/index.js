import _ from 'lodash';
import throwInternalError from '../../utils/throwInternalError';
import Category from '../../models/Category';
import { errorHandler } from '../../utils/errorHandler';

export const getAll = throwInternalError(
  async (req, res) => {
    const categories = await Category.find({ isDeleted: false });
    res.send(categories);
  }
);

export const getById = throwInternalError(
  async (req, res) => {
    res.send(req.model);
  }
);

export const getCategoryList = throwInternalError(
  async (req, res) => {
    const category = req.model;
    const list = [category];

    const collectAllParents = async (child, acc) => {
      const parent = await Category.findOne({ _id: _.get(child, 'parentId'), isDeleted: false });
      acc.unshift(parent);

      if (!_.isNil(_.get(parent, 'parentId'))) {
        await collectAllParents(parent, acc);
      }
    };

    await collectAllParents(category, list);

    res.send(list);
  }
);

export const getChildrenCategories = throwInternalError(
  async (req, res) => {
    const children = await Category.find({ parentId: _.get(req.model, '_id'), isDeleted: false });

    res.send(children);
  }
);

export const create = throwInternalError(
  async (req, res, next) => {
    const { title, parentId } = req.body;

    if (!_.isNil(parentId)) {
      const category = await Category.findOne({ _id: parentId, isDeleted: false });
      if (_.isNil(category)) {
        return errorHandler(next, { code: 404, message: 'Category doest not found' });
      }
    }

    const categoryModel = new Category({
      title,
      parentId,
    });

    const result = await categoryModel.save();

    return res.send(result);
  }
);

export const update = throwInternalError(
  async (req, res) => {
    const data = req.body;
    let category = req.model;

    const { nModified } = await Category.update({ _id: req.params.id }, data);
    if (nModified > 1) {
      category = await Category.findOne({ _id: req.params.id });
    }

    res.send(category);
  }
);

export const deleteById = throwInternalError(
  async (req, res) => {
    const category = req.model;

    await Category.update({ _id: req.params.id }, { isDeleted: true });
    category.isDeleted = true;

    res.send(category);
  }
);
