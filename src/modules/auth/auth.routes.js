const express = require('express')
const { login, getMe, createNewUser } = require('./auth.controller')
const authMiddleware = require('../../middleware/authMiddleware')
const requireAdmin = require('../../middleware/requireAdmin')

const router = express.Router()

router.post('/login', login)
router.get('/me', authMiddleware, getMe)
router.post('/users', authMiddleware, requireAdmin, createNewUser)
module.exports = router
