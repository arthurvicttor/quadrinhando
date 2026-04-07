class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
  }
}

const errorHandler = (err, req, res, next) => {
  // Erro conhecido 
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  // Erro do Prisma: registro não encontrado
  if (err.code === 'P2025') {
    return res.status(404).json({
      status: 'error',
      message: 'Registro não encontrado.',
    })
  }

  // Erro do Prisma: violação de constraint única
  if (err.code === 'P2002') {
    return res.status(409).json({
      status: 'error',
      message: 'Conflito: registro duplicado.',
    })
  }

  // Erro genérico 
  console.error('ERRO NÃO TRATADO:', err)

  return res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'development'
      ? err.message
      : 'Erro interno do servidor.',
  })
}

module.exports = { AppError, errorHandler }