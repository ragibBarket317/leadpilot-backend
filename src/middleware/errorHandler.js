const errorHandler = (err, req, res, next) => {
  console.log('Error handler', err)
  const statusCode = err.statusCode || 500
  const code = err.code || 'INTERNAL_SERVER_ERROR'

  const message = statusCode === 500 ? 'Internal Server Error' : err.message

  console.error(err)

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
    },
  })
}

module.exports = errorHandler
