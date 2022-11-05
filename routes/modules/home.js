const express = require('express')
const router = express.Router()

const Restaurant = require("../../models/restaurants")

router.get('/', (req, res) => {
    // load restaurants
    const userId = req.user._id
    Restaurant.find({ userId })
      .lean()
      .then(restaurantData => res.render('index', { restaurantData }))
      .catch(error => console.error(error))
  })

  module.exports = router