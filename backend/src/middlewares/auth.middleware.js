const jwt = require('jsonwebtoken')
const { AppError } = require('./errorHandler')

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return next(new AppError('Token não fornecido.', 401))

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    return next(new AppError('Token inválido ou expirado.', 401))
  }
}

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'ADMIN')
    return next(new AppError('Acesso restrito a administradores.', 403))
  next()
}

module.exports = { authenticate, requireAdmin }