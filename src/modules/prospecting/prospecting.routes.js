const express = require('express')

const { search } = require('./prospecting.controller')

const authMiddleware = require('../../middleware/authMiddleware')

const router = express.Router()

router.post('/search', authMiddleware, search)

module.exports = router
