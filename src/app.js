const express = require('express')
const mongoose = require('mongoose')
const errorHandler = require('./middleware/errorHandler')
const asyncHandler = require('./utils/asyncHandler')
const AppError = require('./utils/AppError')
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

app.use(errorHandler)

module.exports = app
