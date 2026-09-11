const mongoose = require('mongoose')
const asyncHandler = require('../../utils/asyncHandler')
const AppError = require('../../utils/AppError')

const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} = require('./lead.service')

const create = asyncHandler(async (req, res) => {
  const lead = await createLead(req.body)

  res.status(201).json({
    success: true,
    data: {
      lead,
    },
  })
})

const getAll = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const search = req.query.search || ''
  const status = req.query.status || ''
  const industry = req.query.industry || ''
  const minScore = req.query.minScore || ''

  const result = await getLeads(page, limit, search, status, industry, minScore)

  res.status(200).json({
    success: true,
    data: {
      leads: result.leads,
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
    throw new AppError('Invalid lead ID', 400, 'INVALID_LEAD_ID')
  }

  const lead = await getLeadById(req.params.id)

  if (!lead) {
    throw new AppError('Lead not found', 404, 'LEAD_NOT_FOUND')
  }

  res.status(200).json({
    success: true,
    data: {
      lead,
    },
  })
})

const update = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError('Invalid lead ID', 400, 'INVALID_LEAD_ID')
  }

  const lead = await updateLead(req.params.id, req.body)

  if (!lead) {
    throw new AppError('Lead not found', 404, 'LEAD_NOT_FOUND')
  }

  res.status(200).json({
    success: true,
    data: {
      lead,
    },
  })
})

const remove = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError('Invalid lead ID', 400, 'INVALID_LEAD_ID')
  }

  const lead = await deleteLead(req.params.id)

  if (!lead) {
    throw new AppError('Lead not found', 404, 'LEAD_NOT_FOUND')
  }

  res.status(200).json({
    success: true,
    data: {
      message: 'Lead deleted successfully',
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
