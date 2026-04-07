const { Router } = require('express')
const ctrl = require('../controllers/universe.controller')

const router = Router()

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getById)
router.get('/:id/comics', ctrl.getComics)

module.exports = router