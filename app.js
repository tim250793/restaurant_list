// require packages used in the project
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurants')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes')
const session = require('express-session')
const morgan = require('morgan')
const usePassport = require('./config/passport')
const methodOverride = require('method-override')
const flash = require('connect-flash')

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
  resave: false,
  saveUninitialized: true
}))

// setting password
usePassport(app)

// routes setting
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
//引入路由模組@routes/index.js
usePassport(app)
//調用passport.js並帶入app
app.use(flash())

app.use((req, res, next) => {
  console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})


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

app.use(routes)

// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})