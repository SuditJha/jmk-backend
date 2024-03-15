var express = require('express');
var router = express.Router();
const userModel = require('./users')

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

module.exports = router;
