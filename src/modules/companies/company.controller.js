const asyncHandler = require('../../utils/asyncHandler')
const { createCompany, getCompanies } = require('./company.service')

const create = asyncHandler(async (req, res) => {
  const company = await createCompany(req.body)

  res.status(201).json({
    success: true,
    data: {
      company,
    },
  })
})

const getAll = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10

  const result = await getCompanies(page, limit)

  res.status(200).json({
    success: true,
    data: {
      companies: result.companies,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    },
  })
})

module.exports = {
  create,
  getAll,
}
