const express = require('express')
const router = express.Router()

const Restaurant = require("../../models/restaurants")

//新增餐廳路由
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//新增餐廳頁面
router.get('/create', (req, res) => {
  return res.render('create')
})

//顯示餐廳show頁面的路由
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//餐廳編輯頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//編輯餐廳路由
router.post('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = req.body.rating
      restaurant.description = req.body.description
      return restaurant.save()
    })
    .then(()=> res.redirect(`/${id}`))
    .catch(error => console.log(error))
})

// router.post('/', (req, res) => {
//   const userId = req.user._id
//   const name = req.body.name

//   // 從 req.body 拿出表單裡的資料,儲存資料到 mongoDB
//   return Restaurant.create({ ...req.body, userId }) 
//     .then(() => res.redirect('/')) // 新增完成後導回首頁 
//     .catch(error => console.log(error))
// })

// // 更新資料 edit 路由，更新完資料後將資料送給資料庫
// router.put('/:id', (req, res) => {
//   const userId = req.user._id
//   const _id = req.params.id
  
//   return Restaurant.findByIdAndUpdate({ _id, userId }, req.body) //找到對應的資料後整個一起更新
//     .then(() => res.redirect(`/restaurants/${_id}`))
//     .catch(err => console.log(err))
// })

// // 刪除資料 delete 路由
// router.delete('/:id', (req, res) => {
//   const userId = req.user._id
//   const _id = req.params.id
//   return Restaurant.findOne({ _id, userId })
//     .then(restaurant => restaurant.remove())
//     .then(() => res.redirect('/'))
//     .catch(err => console.error(err))
// })

module.exports = router