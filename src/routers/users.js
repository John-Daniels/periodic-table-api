const router = require("express").Router()
const bcrypt = require("bcryptjs")

const User = require("../models/user")
const auth = require("../middleware/auth")

router.post("/create", async (req, res) => {
  const { username, email, password } = req.body
  const newUser = {
    username,
    email,
    password: await bcrypt.hash(password, 8),
  }

  try {
    const errors = {}

    const dupUser = await User.findOne({ username })
    if (dupUser) errors.username = "is taken"

    const dupEmail = await User.findOne({ email })
    if (dupEmail) errors.email = "is taken"

    //check if there is any error
    if (Object.keys(errors).length > 0) return res.status(400).send(errors)

    const user = new User(newUser)
    await user.save()

    const token = user.login()

    const usr = user.toJSON()
    res.status(201).send({ ...usr, token })
  } catch (e) {
    res.status(500).send(e)
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    // check user
    const user = await User.findOne({ email: email })
    if (!user) return res.status(400).send({ error: "cant find this email" })

    // check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ error: "wrong credentials!" })

    //create token
    const token = user.login()

    //hide password
    const usr = user.toJSON()
    res.send({ ...usr, token })
  } catch (e) {
    res.status(500).send(e)
  }
})

//delete user
router.delete("/", auth, async (req, res) => {
  await req.user.remove()
  res.send({ message: "success" })
})

module.exports = router
