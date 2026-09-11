const Lead = require('./lead.model')
const Company = require('../companies/company.model')
const Contact = require('../contacts/contact.model')

const createLead = async (leadData) => {
  return Lead.create(leadData)
}

const getLeads = async (
  page = 1,
  limit = 10,
  search = '',
  status = '',
  industry = '',
  minScore = '',
) => {
  const skip = (page - 1) * limit
  const filter = {}

  if (search) {
    const [contacts, companies] = await Promise.all([
      Contact.find({
        name: { $regex: search, $options: 'i' },
      }).select('_id'),
      Company.find({
        name: { $regex: search, $options: 'i' },
      }).select('_id'),
    ])

    const contactIds = contacts.map((contact) => contact._id)
    const companyIds = companies.map((company) => company._id)

    filter.$or = [
      { contact: { $in: contactIds } },
      { company: { $in: companyIds } },
      { intent: { $regex: search, $options: 'i' } },
      { opportunity: { $regex: search, $options: 'i' } },
    ]
  }

  if (industry) {
    const companies = await Company.find({
      industry: { $regex: industry, $options: 'i' },
    }).select('_id')

    filter.company = {
      $in: companies.map((company) => company._id),
    }
  }

  if (status) {
    filter.status = status
  }

  if (minScore !== '') {
    filter.score = { $gte: Number(minScore) }
  }

  const [leads, total] = await Promise.all([
    Lead.find(filter)
      .populate('contact', 'name role email phone')
      .populate('company', 'name industry website')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Lead.countDocuments(filter),
  ])

  return {
    leads,
    total,
    totalPages: Math.ceil(total / limit),
  }
}

const getLeadById = async (id) => {
  return Lead.findById(id)
    .populate('contact', 'name role email phone')
    .populate('company', 'name industry website')
}

const updateLead = async (id, leadData) => {
  return Lead.findByIdAndUpdate(id, leadData, {
    new: true,
    runValidators: true,
  })
    .populate('contact', ' name role email phone')
    .populate('company', 'name industry website')
}

const deleteLead = async (id) => {
  return Lead.findByIdAndDelete(id)
}

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
}
