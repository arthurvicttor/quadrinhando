require('dotenv').config()
const app = require('./src/app')
const prisma = require('./src/config/database')

const PORT = process.env.PORT || 3333

const start = async () => {
  try {
    await prisma.$connect()
    console.log('✅ Conectado ao PostgreSQL via Prisma')

    app.listen(PORT, () => {
      console.log(`🚀 Quadrinhando API rodando em http://localhost:${PORT}/api/v1`)
      console.log(`📋 Health check: http://localhost:${PORT}/api/v1/health`)
    })
  } catch (err) {
    console.error('Falha ao conectar ao banco:', err)
    process.exit(1)
  }
}

start()