const express = require('express')
const router = express.Router()

const Restaurant = require("../../models/restaurants")

router.get('/', (req, res) => {
    // load restaurants
    Restaurant.find()
      .lean()
      .then(restaurantData => res.render('index', { restaurantData }))
      .catch(error => console.error(error))
  })

  module.exports = router