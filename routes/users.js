const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

// Establishing Connection
mongoose.connect('mongodb://127.0.0.1:27017/auth')

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
})

userSchema.plugin(plm)

module.exports = mongoose.model("user", userSchema)