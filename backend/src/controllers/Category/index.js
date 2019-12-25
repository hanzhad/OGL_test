import _ from 'lodash';
import throwInternalError from '../../utils/throwInternalError';
import Category from '../../models/Category';

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
