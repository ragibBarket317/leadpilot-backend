const mongoose = require('mongoose')
const asyncHandler = require('../../utils/asyncHandler')
const AppError = require('../../utils/AppError')

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('./task.service')

const create = asyncHandler(async (req, res) => {
  const task = await createTask(req.body)

  res.status(201).json({
    success: true,
    data: {
      task,
    },
  })
})

const getAll = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const tab = req.query.tab || ''

  const result = await getTasks(page, limit, tab)

  res.status(200).json({
    success: true,
    data: {
      tasks: result.tasks,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    },
  })
})

const update = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError('Invalid task ID', 400, 'INVALID_TASK_ID')
  }

  const task = await updateTask(req.params.id, req.body)

  if (!task) {
    throw new AppError('Task not found', 404, 'TASK_NOT_FOUND')
  }

  res.status(200).json({
    success: true,
    data: {
      task,
    },
  })
})

const remove = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError('Invalid task ID', 400, 'INVALID_TASK_ID')
  }

  const task = await deleteTask(req.params.id)

  if (!task) {
    throw new AppError('Task not found', 404, 'TASK_NOT_FOUND')
  }

  res.status(200).json({
    success: true,
    data: {
      message: 'Task deleted successfully',
    },
  })
})

module.exports = {
  create,
  getAll,
  update,
  remove,
}
