const sagaService = require("../services/saga.service");

const getBySlug = async (req, res, next) => {
  try {
    const saga = await sagaService.findBySlug(req.params.slug);
    res.json({ status: "success", data: saga });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, description, order, universeId } = req.body;
    if (!name || !order || !universeId)
      return res
        .status(400)
        .json({
          status: "error",
          message: "name, order e universeId são obrigatórios.",
        });

    const saga = await sagaService.create({
      name,
      description,
      order: Number(order),
      universeId: Number(universeId),
    });
    res.status(201).json({ status: "success", data: saga });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ status: "error", message: "ID inválido." });
    const { name, description, order, universeId } = req.body;
    const saga = await sagaService.update(id, {
      name,
      description,
      order: order ? Number(order) : undefined,
      universeId: universeId ? Number(universeId) : undefined,
    });
    res.json({ status: "success", data: saga });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ status: "error", message: "ID inválido." });
    const result = await sagaService.remove(id);
    res.json({ status: "success", data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getBySlug, create, update, remove };
