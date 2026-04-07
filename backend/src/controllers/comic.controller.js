const comicService = require('../services/comic.service')

const getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ status: 'error', message: 'ID inválido.' })

    const comic = await comicService.findById(id)
    res.json({ status: 'success', data: comic })
  } catch (err) {
    next(err)
  }
}

module.exports = { getById }