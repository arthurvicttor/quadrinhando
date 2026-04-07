const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const { errorHandler } = require('./middlewares/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())

// Todas as rotas prefixadas com /api/v1
app.use('/api/v1', routes)

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Rota não encontrada.' })
})

// Middleware de erros (SEMPRE por último)
app.use(errorHandler)

module.exports = app