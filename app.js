// require packages used in the project
require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurants')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes')
const session = require('express-session')
const morgan = require('morgan')
const usePassport = require('./config/passport')

require('./config/mongoose')

// setting template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))
app.use(morgan('combined'))

//setting sessions
app.use(session({
  secret: "MySecret",
  resave: true,
  saveUninitialized: true
}))

// setting password
usePassport(app)

// routes setting
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

//搜尋餐廳
app.get("/search", (req, res) => {
  if (!req.query.keywords) {
    return res.redirect("/")
  }

  const keyword = req.query.keywords.trim().toLowerCase()
  const restaurant = Restaurant.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword)
  })
  res.render('index', { restaurant })
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})