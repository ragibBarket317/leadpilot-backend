const asyncHandler = require('../../utils/asyncHandler')

const { getPipeline } = require('./pipeline.service')

const getBoard = asyncHandler(async (req, res) => {
  const pipeline = await getPipeline()

  res.status(200).json({
    success: true,
    data: {
      pipeline,
    },
  })
})

module.exports = {
  getBoard,
}
