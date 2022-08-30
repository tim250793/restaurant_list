const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
// const todos = require('./modules/todos')
// const users = require('./modules/users')
// const { authenticator } = require('../middleware/auth')

// router.use('/todos', authenticator, todos)
// router.use('/users', users)
router.use('/restaurants',restaurants)
router.use('/', home)

module.exports = router