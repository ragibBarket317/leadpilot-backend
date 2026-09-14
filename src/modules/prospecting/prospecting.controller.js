const asyncHandler = require('../../utils/asyncHandler')
const AppError = require('../../utils/AppError')

const { searchProspects } = require('./prospecting.service')

const search = asyncHandler(async (req, res) => {
  const {
    industry,
    location,
    companySize,
    technology,
    targetRole,
    serviceProblem,
    leadIntent,
    companyCount,
  } = req.body

  if (!industry || !location || !targetRole || !serviceProblem) {
    throw new AppError(
      'Industry, location, target role and service/problem are required',
      400,
      'INVALID_PROSPECTING_FILTERS',
    )
  }

  if (!companyCount || companyCount < 1) {
    throw new AppError(
      'Company count must be at least 1',
      400,
      'INVALID_COMPANY_COUNT',
    )
  }

  const result = await searchProspects({
    industry,
    location,
    companySize,
    technology,
    targetRole,
    serviceProblem,
    leadIntent,
    companyCount,
  })

  res.status(200).json({
    success: true,
    data: result,
  })
})

module.exports = {
  search,
}
