const Company = require('./company.model')

const createCompany = async (companyData) => {
  return Company.create(companyData)
}

const getCompanies = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit

  const [companies, total] = await Promise.all([
    Company.find().skip(skip).limit(limit),
    Company.countDocuments(),
  ])

  return {
    companies,
    total,
    totalPages: Math.ceil(total / limit),
  }
}

module.exports = {
  createCompany,
  getCompanies,
}
