const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObj = user.toObject()

  delete userObj.password

  return userObj
}

userSchema.methods.login = function () {
  const user = this
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SEC,
    { expiresIn: "7d" }
  )

  return token
}

const User = mongoose.model("users", userSchema)

module.exports = User
