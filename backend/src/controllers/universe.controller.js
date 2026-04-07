const universeService = require('../services/universe.service')

const getAll = async (req, res, next) => {
  try {
    const universes = await universeService.findAll()
    res.json({ status: 'success', data: universes })
  } catch (err) {
    next(err)
  }
}

const getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ status: 'error', message: 'ID inválido.' })

    const universe = await universeService.findById(id)
    res.json({ status: 'success', data: universe })
  } catch (err) {
    next(err)
  }
}

const getComics = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ status: 'error', message: 'ID inválido.' })

    const data = await universeService.findComicsByUniverse(id)
    res.json({ status: 'success', data })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getById, getComics }