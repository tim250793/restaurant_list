const express = require('express')
const router = express.Router()

// routes/modules/users.js
router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
  
    if (!email || !password || !confirmPassword) {
      errors.push({message: '有欄位未填'})
    }
  
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符' })
    }
  
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
  
    User.findOne({ email }).then(user => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了'})
        res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(user => {
          req.login(user, err => {
            if (err) return next(err)
            return res.redirect('/')
          })
        })
        .catch(err => {
        return res.render('error', { errorMessage: err })
      })
      }
    })
  })


router.get('/register', (req, res) => {
    res.render('register')
})

module.exports = router