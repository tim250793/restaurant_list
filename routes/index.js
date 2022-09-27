const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const { authenticator } = require('./../middleware/auth')

const auth = require('./modules/auth')

// router.use('/todos', authenticator, todos)
router.use('/users', users)
router.use('/restaurants',restaurants)
router.use('/', home)
// router.use('/login', login)
router.use('/auth', auth)

module.exports = router