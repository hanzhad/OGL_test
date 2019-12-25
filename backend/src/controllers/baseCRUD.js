import throwInternalError from '../utils/throwInternalError';

export const getAll = (Model) => throwInternalError(
  async (req, res) => {
    res.send(await Model.find({ isDeleted: false }));
  }
);

export const getById = throwInternalError(
  async (req, res) => {
    res.send(req.model);
  }
);

export const create = (Model) => throwInternalError(
  async (req, res) => {
    const itemModel = new Model(req.body);

    return res.send(await itemModel.save());
  }
);

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

export const deleteById = (Model) => throwInternalError(
  async (req, res) => {
    const { model } = req;

    await Model.update({ _id: req.params.id }, { isDeleted: true });
    model.isDeleted = true;

    res.send(model);
  }
);
