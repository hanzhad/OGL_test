import throwInternalError from '../utils/throwInternalError';

/**
 * Request to get all data from the specified model except deleted
 *
 * @param Model
 * @returns {Function}
 */
export const getAll = (Model) => throwInternalError(
  async (req, res) => {
    res.send(await Model.find({ isDeleted: false }));
  }
);

/**
 * Request to get data from specified model by model id except deleted
 *
 * @type {Function}
 */
export const getById = throwInternalError(
  async (req, res) => {
    res.send(req.model);
  }
);

/**
 * Request to create record in specified model
 *
 * @param Model
 * @returns {Function}
 */
export const create = (Model) => throwInternalError(
  async (req, res) => {
    const itemModel = new Model(req.body);

    return res.send(await itemModel.save());
  }
);

/**
 * Request to update record in specified model
 *
 * @param Model
 * @returns {Function}
 */
export const update = (Model) => throwInternalError(
  async (req, res) => {
    const data = req.body;
    let { model } = req;

    const { nModified } = await Model.updateOne({ _id: req.params.id }, data);
    if (nModified > 0) {
      model = await Model.findOne({ _id: req.params.id });
    }

    res.send(model);
  }
);

/**
 * Request to delete record from the specified model
 *
 * @param Model
 * @returns {Function}
 */
export const deleteById = (Model) => throwInternalError(
  async (req, res) => {
    const { model } = req;

    await Model.updateOne({ _id: req.params.id }, { isDeleted: true });
    model.isDeleted = true;

    res.send(model);
  }
);
