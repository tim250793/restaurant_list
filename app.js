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
const morgan = require('morgan')


require('./config/mongoose')

// setting template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))
app.use(morgan('combined'))

// routes setting
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

// //新增餐廳頁面
// app.get('/restaurants/create', (req, res) => {
//    return res.render('create')
// })

// //顯示餐廳show頁面的路由
// app.get('/restaurants/:id', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .lean()
//     .then(restaurant => res.render('show', { restaurant }))
//     .catch(error => console.log(error))
// })

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



// //新增餐廳路由
// app.post('/restaurants', (req, res) => {
//   Restaurant.create(req.body)
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// //餐廳編輯頁面
// app.get('/restaurants/:id/edit', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .lean()
//     .then(restaurant => res.render('edit', { restaurant }))
//     .catch(error => console.log(error))
// })

// //編輯餐廳路由
// app.post('/restaurants/:id', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .then(restaurant => {
//       restaurant.name = req.body.name
//       restaurant.name_en = req.body.name_en
//       restaurant.category = req.body.category
//       restaurant.image = req.body.image
//       restaurant.location = req.body.location
//       restaurant.phone = req.body.phone
//       restaurant.google_map = req.body.google_map
//       restaurant.rating = req.body.rating
//       restaurant.description = req.body.description
//       return restaurant.save()
//     })
//     .then(()=> res.redirect(`/restaurants/${id}`))
//     .catch(error => console.log(error))
// })

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})