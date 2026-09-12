const express = require('express')

const { create, getAll, update, remove } = require('./task.controller')

const authMiddleware = require('../../middleware/authMiddleware')

const router = express.Router()

router.post('/', authMiddleware, create)
router.get('/', authMiddleware, getAll)
router.patch('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, remove)

module.exports = router
