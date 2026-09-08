require('dotenv').config()

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../src/modules/auth/user.model')

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    const existingAdmin = await User.findOne({
      email: 'superadmin@pilot.com',
    })

    if (existingAdmin) {
      console.log('Admin already exists')
      return
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)

    await User.create({
      name: 'Super Admin',
      email: 'superadmin@pilot.com',
      password: hashedPassword,
      role: 'admin',
    })

    console.log('Admin created successfully')
  } catch (error) {
    console.error('Failed to create admin:', error)
  } finally {
    await mongoose.connection.close()
  }
}

createAdmin()
