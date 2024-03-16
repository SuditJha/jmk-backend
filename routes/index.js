var express = require('express');
var router = express.Router();
const userModel = require('./users')
const passport = require('passport')
// Importing passportlocal Strategy
const localStrategy = require('passport-local')
passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});




router.get('/create', async function (req, res) {
  const createdUser = await userModel.create({
    name: "Harsh",
    age: 21
  })
  res.send(createdUser)
})

router.get('/readAll', async function (req, res) {
  const allUser = await userModel.find()
  res.send(allUser)
})

router.get('/readOne', async function (req, res) {
  const readOne = await userModel.find({
    name: "Harsh"
  })
  res.send(readOne)
})

router.get('/deleteUser', async function (req, res) {
  const deletedUser = await userModel.findOneAndDelete({
    name: 'Harsh'
  })
  res.send(deletedUser)
})

router.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile')
})

// Register Route
router.post('/register', function (req, res) {
  const userData = new userModel({
    username: req.body.username,
    email: req.body.email
  })
  userModel.register(userData, req.body.password)
    .then(function (registereduser) {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile')
      })
    })
})

// Login route

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/'
}), function (req, res) { })


// Logout

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

// Is logged in middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

module.exports = router;
