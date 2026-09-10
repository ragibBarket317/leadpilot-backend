const Company = require('./company.model')

const createCompany = async (companyData) => {
  return Company.create(companyData)
}

const getCompanies = async (
  page = 1,
  limit = 10,
  search = '',
  industry = '',
) => {
  const skip = (page - 1) * limit
  const filter = {}

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { website: { $regex: search, $options: 'i' } },
    ]
  }

  if (industry) {
    filter.industry = industry
  }

  const [companies, total] = await Promise.all([
    Company.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Company.countDocuments(filter),
  ])

  return {
    companies,
    total,
    totalPages: Math.ceil(total / limit),
  }
}

const getCompanyById = async (id) => {
  return Company.findById(id)
}

const updateCompany = async (id, companyData) => {
  return Company.findByIdAndUpdate(id, companyData, {
    new: true,
    runValidators: true,
  })
}

const deleteCompany = async (id) => {
  return Company.findByIdAndDelete(id)
}

module.exports = {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
}
