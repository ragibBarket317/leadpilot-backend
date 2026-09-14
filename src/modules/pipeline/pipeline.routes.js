const express = require('express')

const { getBoard } = require('./pipeline.controller')

const authMiddleware = require('../../middleware/authMiddleware')

const router = express.Router()

router.get('/', authMiddleware, getBoard)

module.exports = router
