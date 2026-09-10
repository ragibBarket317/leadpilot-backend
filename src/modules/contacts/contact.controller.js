const mongoose = require('mongoose')
const asyncHandler = require('../../utils/asyncHandler')
const AppError = require('../../utils/AppError')

const {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require('./contact.service')

const create = asyncHandler(async (req, res) => {
  const contact = await createContact(req.body)

  res.status(201).json({
    success: true,
    data: {
      contact,
    },
  })
})

const getAll = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10

  const search = req.query.search || ''
  const leadStatus = req.query.leadStatus || ''
  const company = req.query.company || ''

  const result = await getContacts(page, limit, search, leadStatus, company)

  res.status(200).json({
    success: true,
    data: {
      contacts: result.contacts,
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
    throw new AppError('Invalid contact ID', 400, 'INVALID_CONTACT_ID')
  }

  const contact = await getContactById(req.params.id)

  if (!contact) {
    throw new AppError('Contact not found', 404, 'CONTACT_NOT_FOUND')
  }

  res.status(200).json({
    success: true,
    data: {
      contact,
    },
  })
})

const update = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError('Invalid contact ID', 400, 'INVALID_CONTACT_ID')
  }

  const contact = await updateContact(req.params.id, req.body)

  if (!contact) {
    throw new AppError('Contact not found', 404, 'CONTACT_NOT_FOUND')
  }

  res.status(200).json({
    success: true,
    data: {
      contact,
    },
  })
})

const remove = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError('Invalid contact ID', 400, 'INVALID_CONTACT_ID')
  }

  const contact = await deleteContact(req.params.id)

  if (!contact) {
    throw new AppError('Contact not found', 404, 'CONTACT_NOT_FOUND')
  }

  res.status(200).json({
    success: true,
    data: {
      message: 'Contact deleted successfully',
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
