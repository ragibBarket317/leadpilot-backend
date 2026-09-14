const { findProspects } = require('./prospecting.provider')

const searchProspects = async (filters) => {
  const prospects = await findProspects(filters)

  return {
    filters,
    results: prospects,
  }
}

module.exports = {
  searchProspects,
}
