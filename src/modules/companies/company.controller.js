const mongoose = require('mongoose')
const asyncHandler = require('../../utils/asyncHandler')
const AppError = require('../../utils/AppError')
const {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require('./company.service')

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

  const search = req.query.search || ''
  const industry = req.query.industry || ''

  const result = await getCompanies(page, limit, search, industry)

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

const getOne = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError('Invalid company ID', 400, 'INVALID_COMPANY_ID')
  }
  const company = await getCompanyById(req.params.id)

  if (!company) {
    throw new AppError('Company not found', 404, 'COMPANY_NOT_FOUND')
  }

  res.status(200).json({
    success: true,
    data: {
      company,
    },
  })
})

const update = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError('Invalid company ID', 400, 'INVALID_COMPANY_ID')
  }

  const company = await updateCompany(req.params.id, req.body)

  if (!company) {
    throw new AppError('Company not found', 404, 'COMPANY_NOT_FOUND')
  }

  res.status(200).json({
    success: true,
    data: {
      company,
    },
  })
})

const remove = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError('Invalid company ID', 400, 'INVALID_COMPANY_ID')
  }

  const company = await deleteCompany(req.params.id)

  if (!company) {
    throw new AppError('Company not found', 404, 'COMPANY_NOT_FOUND')
  }

  res.status(200).json({
    success: true,
    data: {
      message: 'Company deleted successfully',
    },
  })
})

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
}
