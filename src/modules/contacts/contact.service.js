const Contact = require('./contact.model')

const createContact = async (contactData) => {
  return Contact.create(contactData)
}

const getContacts = async (
  page = 1,
  limit = 10,
  search = '',
  leadStatus = '',
  company = '',
) => {
  const skip = (page - 1) * limit

  const filter = {}

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { role: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
    ]
  }

  if (leadStatus) {
    filter.leadStatus = leadStatus
  }

  if (company) {
    filter.company = company
  }

  const [contacts, total] = await Promise.all([
    Contact.find(filter)
      .populate('company', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Contact.countDocuments(filter),
  ])

  return {
    contacts,
    total,
    totalPages: Math.ceil(total / limit),
  }
}

const getContactById = async (id) => {
  return Contact.findById(id).populate('company', 'name')
}

const updateContact = async (id, contactData) => {
  return Contact.findByIdAndUpdate(id, contactData, {
    new: true,
    runValidators: true,
  }).populate('company', 'name')
}

const deleteContact = async (id) => {
  return Contact.findByIdAndDelete(id)
}

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
}
