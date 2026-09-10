const express = require('express')
const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require('./company.controller')
const authMiddleware = require('../../middleware/authMiddleware')

const router = express.Router()

router.post('/', authMiddleware, create)
router.get('/', authMiddleware, getAll)
router.get('/:id', authMiddleware, getOne)
router.patch('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, remove)

module.exports = router
