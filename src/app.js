const express = require('express')
const mongoose = require('mongoose')
const errorHandler = require('./middleware/errorHandler')
const asyncHandler = require('./utils/asyncHandler')
const AppError = require('./utils/AppError')
const authRoutes = require('./modules/auth/auth.routes')
const companyRoutes = require('./modules/companies/company.routes')
const contactRoutes = require('./modules/contacts/contact.routes')

const app = express()

app.use(express.json())

app.get('/api/health', (req, res) => {
  const databaseStatus =
    mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
      database: databaseStatus,
    },
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/companies', companyRoutes)
app.use('/api/contacts', contactRoutes)

app.use((req, res, next) => {
  const error = new AppError(
    `Route not found: ${req.method} ${req.originalUrl}`,
    404,
    'ROUTE_NOT_FOUND',
  )

  next(error)
})

app.use(errorHandler)

module.exports = app
