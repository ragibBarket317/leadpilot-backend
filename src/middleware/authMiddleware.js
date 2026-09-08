const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(
      new AppError('Authentication required', 401, 'AUTHENTICATION_REQUIRED'),
    )
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return next(new AppError('Invalid token', 401, 'INVALID_TOKEN'))
  }
}

module.exports = authMiddleware
