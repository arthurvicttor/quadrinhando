const characterService = require('../services/character.service')

const getAll = async (req, res, next) => {
  try {
    const { search } = req.query
    const characters = await characterService.findAll({ search })
    res.json({ status: 'success', data: characters })
  } catch (err) {
    next(err)
  }
}

const getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ status: 'error', message: 'ID inválido.' })

    const character = await characterService.findById(id)
    res.json({ status: 'success', data: character })
  } catch (err) {
    next(err)
  }
}

const getComics = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ status: 'error', message: 'ID inválido.' })

    const data = await characterService.findComicsByCharacter(id)
    res.json({ status: 'success', data })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getById, getComics }