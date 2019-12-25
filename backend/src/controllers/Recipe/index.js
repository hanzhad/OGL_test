import throwInternalError from '../../utils/throwInternalError';
import Recipe from '../../models/Recipe';

// eslint-disable-next-line import/prefer-default-export
export const getByCategoryId = throwInternalError(
  async (req, res) => {
    const list = await Recipe.find({ categoryId: req.params.id });
    res.send(list);
  }
);
