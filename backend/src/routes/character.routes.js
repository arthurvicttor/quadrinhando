const { Router } = require('express')
const ctrl = require('../controllers/character.controller')

const router = Router()

// Suporta ?search=nome
router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getById)
router.get('/:id/comics', ctrl.getComics)

module.exports = router