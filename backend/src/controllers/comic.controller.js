const comicService = require("../services/comic.service");

const getAll = async (req, res, next) => {
  try {
    const comics = await comicService.findAll();
    res.json({ status: "success", data: comics });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ status: "error", message: "ID inválido." });
    const comic = await comicService.findById(id);
    res.json({ status: "success", data: comic });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const {
      title,
      volume,
      issueNumber,
      universeId,
      orderInUniverse,
      coverUrl,
      officialBuyLink,
      characters,
    } = req.body;

    if (!title || !universeId || orderInUniverse === undefined)
      return res.status(400).json({
        status: "error",
        message: "title, universeId e orderInUniverse são obrigatórios.",
      });

    const comic = await comicService.create({
      title,
      volume: volume ? Number(volume) : 1,
      issueNumber: issueNumber ? Number(issueNumber) : null,
      universeId: Number(universeId),
      orderInUniverse: Number(orderInUniverse),
      coverUrl,
      officialBuyLink,
      characters,
    });
    res.status(201).json({ status: "success", data: comic });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ status: "error", message: "ID inválido." });

    const {
      title,
      volume,
      issueNumber,
      universeId,
      orderInUniverse,
      coverUrl,
      officialBuyLink,
    } = req.body;

    const comic = await comicService.update(id, {
      title,
      volume: volume ? Number(volume) : undefined,
      issueNumber: issueNumber ? Number(issueNumber) : undefined,
      universeId: universeId ? Number(universeId) : undefined,
      orderInUniverse: orderInUniverse ? Number(orderInUniverse) : undefined,
      coverUrl,
      officialBuyLink,
    });
    res.json({ status: "success", data: comic });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ status: "error", message: "ID inválido." });

    const result = await comicService.remove(id);
    res.json({ status: "success", data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };
