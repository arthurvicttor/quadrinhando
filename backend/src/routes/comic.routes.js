const { Router } = require('express')
const ctrl = require('../controllers/comic.controller')

const router = Router()

router.get('/:id', ctrl.getById)

module.exports = router