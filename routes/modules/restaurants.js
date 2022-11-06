const express = require('express')
const router = express.Router()

const Restaurant = require("../../models/restaurants")


//顯示新增餐廳頁面
router.get('/create', (req, res) => {
  return res.render('create')
})

//新增餐廳路由
router.post('/', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, name_en, location, google_map, phone, image, category, price, rating, description } = req.body
  return Restaurant.create({ name, name_en, location, google_map, phone, image, category, price, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//顯示餐廳show頁面的路由
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})


//顯示編輯餐廳頁面的路由
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const isSelected = {}//宣告物件
  return Restaurant.findOne({userId, _id})
    .lean()
    .then(restaurant => {
        //若餐廳係某個特定的類別，則在物件中增加該類別為屬性並將值設定為1
      const category = restaurant.category
      const price = restaurant.price
      switch (category) {
        case '台式':
          isSelected.Taiwanese = 1
          break;
        case '美式':  
          isSelected.American = 1
          break;
        case '咖啡': 
          isSelected.cafe = 1
          break;
        case '中東料理':  
          isSelected.MiddleEastern = 1
          break;
        case '日本料理':  
          isSelected.Japanese = 1
          break;
        case '義式餐廳':  
          isSelected.Italian = 1
          break;
        case '酒吧':  
          isSelected.pub = 1
          break;
        case '其他':  
          isSelected.other = 1
          break;
      }
      switch (price) {
        case '$100以下':
          isSelected.hundred = 1
          break;
        case '$100-$300':
          isSelected.aboveHundred = 1
          break;
        case '$300-$1000':
          isSelected.thousand = 1
          break;
        case '$1000以上':
          isSelected.aboveThousand = 1
          break;
      }
      res.render('edit', { restaurant, isSelected })
    })
    .catch(error => {
      return res.render('error')
    })
})

//編輯餐廳路由
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const { name, name_en, location, google_map, phone, image, category, price, rating } = req.body
  return Restaurant.findOne({userId, _id})
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.location = location
      restaurant.google_map = google_map
      restaurant.phone = phone
      restaurant.image = image
      restaurant.category = category
      restaurant.price = price
      restaurant.rating = rating
      restaurant.markModified('name')
      restaurant.markModified('name_en')
      restaurant.markModified('location')
      restaurant.markModified('google_map')
      restaurant.markModified('phone')
      restaurant.markModified('image')
      restaurant.markModified('category')
      restaurant.markModified('price')
      restaurant.markModified('rating')
      return restaurant.save()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      return res.render('error')
    })
})


//新增餐廳路由
router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name

  // 從 req.body 提取表單裡資料,儲存到 mongoDB
  return Restaurant.create({ ...req.body, userId })
    .then(() => res.redirect('/')) 
    .catch(error => console.log(error))
})

// 刪除資料路由
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router