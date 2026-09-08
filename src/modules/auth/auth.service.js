const bcrypt = require('bcrypt')
const User = require('./user.model')
const jwt = require('jsonwebtoken')

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10)
}

const loginUser = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) return null

  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch) return null

  return user
}

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  )
}

const createUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email })

  if (existingUser) {
    return null
  }

  const hashedPassword = await hashPassword(password)

  return User.create({
    name,
    email,
    password: hashedPassword,
    role: 'user',
  })
}

module.exports = {
  hashPassword,
  loginUser,
  generateToken,
  createUser,
}
