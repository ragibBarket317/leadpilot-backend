const Task = require('./task.model')

const createTask = async (taskData) => {
  return Task.create(taskData)
}

const getTasks = async (page = 1, limit = 10, tab = '') => {
  const skip = (page - 1) * limit

  const filter = {}
  const now = new Date()

  const todayStart = new Date()
  todayStart.setUTCHours(0, 0, 0, 0)

  const bangladeshOffset = 6 * 60 * 60 * 1000

  const startOfToday = new Date(todayStart.getTime() - bangladeshOffset)

  const endOfToday = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000 - 1)

  if (tab === 'today') {
    filter.dueDate = {
      $gte: startOfToday,
      $lte: endOfToday,
    }
    filter.status = 'pending'
  }

  if (tab === 'upcoming') {
    filter.dueDate = {
      $gt: endOfToday,
    }
    filter.status = 'pending'
  }

  if (tab === 'overdue') {
    filter.dueDate = {
      $lt: startOfToday,
    }

    filter.status = 'pending'
  }

  if (tab === 'completed') {
    filter.status = 'completed'
  }

  const [tasks, total] = await Promise.all([
    Task.find(filter)
      .populate('lead', 'contact company')
      .populate('company', 'name')
      .sort({ dueDate: 1 })
      .skip(skip)
      .limit(limit),

    Task.countDocuments(filter),
  ])

  return {
    tasks,
    total,
    totalPages: Math.ceil(total / limit),
  }
}

const updateTask = async (id, taskData) => {
  return Task.findByIdAndUpdate(id, taskData, {
    new: true,
    runValidators: true,
  })
    .populate('lead', 'contact company')
    .populate('company', 'name')
}

const deleteTask = async (id) => {
  return Task.findByIdAndDelete(id)
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
}
