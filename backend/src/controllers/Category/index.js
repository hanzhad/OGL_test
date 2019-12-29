import _ from 'lodash';
import throwInternalError from '../../utils/throwInternalError';
import Category from '../../models/Category';

export const getCategoryList = throwInternalError(
  async (req, res) => {
    const category = req.model;
    const list = [category];

    const collectAllParents = async (child, acc) => {
      const parent = await Category.findOne({ _id: _.get(child, 'parentId'), isDeleted: false });

      if (!_.isNil(parent)) {
        acc.unshift(parent);
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

export const deleteById = throwInternalError(
  async (req, res) => {
    const { model } = req;

    const categoriesToDelete = [];

    const collectAllChildren = async (parent, acc) => {
      acc.push(parent);
      const children = await Category.find({ parentId: _.get(parent, '_id'), isDeleted: false });

      _.forEach(children, (c) => collectAllChildren(c, acc));
    };

    await collectAllChildren(model, categoriesToDelete);

    await Category.updateMany({ _id: { $in: _.map(categoriesToDelete, '_id') } }, { isDeleted: true });
    model.isDeleted = true;

    res.send(model);
  }
);
