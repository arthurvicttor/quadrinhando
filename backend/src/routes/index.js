const { Router } = require('express')
const universeRoutes = require('./universe.routes')
const characterRoutes = require('./character.routes')
const comicRoutes = require('./comic.routes')

const router = Router()

router.use('/universes', universeRoutes)
router.use('/characters', characterRoutes)
router.use('/comics', comicRoutes)

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

module.exports = router