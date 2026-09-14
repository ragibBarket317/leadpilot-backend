const Lead = require('../leads/lead.model')

const pipelineStages = [
  'new',
  'qualified',
  'contacted',
  'replied',
  'meeting',
  'proposal',
  'won',
  'lost',
]

const getPipeline = async () => {
  const leads = await Lead.find({
    status: {
      $in: pipelineStages,
    },
  })
    .populate('contact', 'name')
    .populate('company', 'name')
    .sort({ updatedAt: -1 })

  const pipeline = pipelineStages.map((stage) => {
    const stageLeads = leads.filter((lead) => lead.status === stage)

    return {
      stage,
      count: stageLeads.length,
      leads: stageLeads,
    }
  })
  return pipeline
}
module.exports = {
  getPipeline,
}
