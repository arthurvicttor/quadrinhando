const universeService = require("../services/universe.service");

const getAll = async (req, res, next) => {
  try {
    const universes = await universeService.findAll();
    res.json({ status: "success", data: universes });
  } catch (err) {
    next(err);
  }
};

const getBySlug = async (req, res, next) => {
  try {
    const universe = await universeService.findBySlug(req.params.slug);
    res.json({ status: "success", data: universe });
  } catch (err) {
    next(err);
  }
};

const getSagas = async (req, res, next) => {
  try {
    const sagas = await universeService.findSagasByUniverse(req.params.slug);
    res.json({ status: "success", data: sagas });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, description, startYear, companyId } = req.body;
    if (!name || !companyId)
      return res
        .status(400)
        .json({
          status: "error",
          message: "name e companyId são obrigatórios.",
        });

    const universe = await universeService.create({
      name,
      description,
      startYear: Number(startYear),
      companyId: Number(companyId),
    });
    res.status(201).json({ status: "success", data: universe });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ status: "error", message: "ID inválido." });
    const { name, description, startYear, companyId } = req.body;
    const universe = await universeService.update(id, {
      name,
      description,
      startYear: startYear ? Number(startYear) : undefined,
      companyId: companyId ? Number(companyId) : undefined,
    });
    res.json({ status: "success", data: universe });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ status: "error", message: "ID inválido." });
    const result = await universeService.remove(id);
    res.json({ status: "success", data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getBySlug, getSagas, create, update, remove };
