const characterService = require("../services/character.service");

const getAll = async (req, res, next) => {
  try {
    const { search } = req.query;
    const characters = await characterService.findAll({ search });
    res.json({ status: "success", data: characters });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ status: "error", message: "ID inválido." });
    const character = await characterService.findById(id);
    res.json({ status: "success", data: character });
  } catch (err) {
    next(err);
  }
};

const getComics = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ status: "error", message: "ID inválido." });
    const data = await characterService.findComicsByCharacter(id);
    res.json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, description, imageUrl } = req.body;
    if (!name)
      return res
        .status(400)
        .json({ status: "error", message: "name é obrigatório." });

    const character = await characterService.create({
      name,
      description,
      imageUrl,
    });
    res.status(201).json({ status: "success", data: character });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ status: "error", message: "ID inválido." });

    const { name, description, imageUrl } = req.body;
    const character = await characterService.update(id, {
      name,
      description,
      imageUrl,
    });
    res.json({ status: "success", data: character });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ status: "error", message: "ID inválido." });

    const result = await characterService.remove(id);
    res.json({ status: "success", data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, getComics, create, update, remove };
