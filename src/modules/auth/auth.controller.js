const AppError = require('../../utils/AppError')
const asyncHandler = require('../../utils/asyncHandler')
const { loginUser, generateToken, createUser } = require('./auth.service')
const User = require('./user.model')

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await loginUser(email, password)

  if (!user) {
    throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS')
  }

  const token = generateToken(user)

  res.status(200).json({
    success: true,
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  })
})

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId).select(
    '_id name email role',
  )

  if (!user) {
    throw new AppError('User not found', 404, 'USER_NOT_FOUND')
  }

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  })
})

// Create user by admin
const createNewUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const user = await createUser(name, email, password)

  if (!user) {
    throw new AppError(
      'User with this email already exists',
      409,
      'USER_ALREADY_EXISTS',
    )
  }

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  })
})

module.exports = {
  login,
  getMe,
  createNewUser,
}
