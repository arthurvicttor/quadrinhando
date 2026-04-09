const authService = require('../services/auth.service')

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password)
      return res.status(400).json({ status: 'error', message: 'name, email e password são obrigatórios.' })

    if (password.length < 6)
      return res.status(400).json({ status: 'error', message: 'A senha deve ter ao menos 6 caracteres.' })

    const user = await authService.register({ name, email, password })
    res.status(201).json({ status: 'success', data: user })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ status: 'error', message: 'email e password são obrigatórios.' })

    const data = await authService.login({ email, password })
    res.json({ status: 'success', data })
  } catch (err) {
    next(err)
  }
}

module.exports = { register, login }