const Restaurant = require('../restaurants')// 載入 resturants model
const db = require('../../config/mongoose.js')
const restaurantsList = require("../../restaurant.json").results
require('dotenv').config()

db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(restaurantsList)
    .then(() => {
      console.log("restaurantSeeder create successfully!")
      db.close()
    })
    .catch(err => console.log(err))
})