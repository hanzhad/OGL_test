import throwInternalError from '../../utils/throwInternalError';
import Article from '../../models/Article';

// eslint-disable-next-line import/prefer-default-export
export const getByCategoryId = throwInternalError(
  async (req, res) => {
    const list = await Article.find({ categoryId: req.params.id, isDeleted: false });
    res.send(list);
  }
);
