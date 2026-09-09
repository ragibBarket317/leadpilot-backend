const express = require('express')
const { create, getAll } = require('./company.controller')
const authMiddleware = require('../../middleware/authMiddleware')

const router = express.Router()

router.post('/', authMiddleware, create)
router.get('/', authMiddleware, getAll)

module.exports = router
