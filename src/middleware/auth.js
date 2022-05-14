const jwt = require("jsonwebtoken")
const User = require("../models/user")

const auth = (req, res, next) => {
  const authHeader = req.headers.token

  if (authHeader) {
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SEC, async (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .send({ error: "You are not authorized, token is invalid!" })
      }
      console.log(decoded)
      const user = await User.findOne({ _id: decoded.id })
      if (!user) return res.status(404).send({ error: "cannot find this user" })
      req.user = user

      next()
    })
  } else {
    return res.status(401).send({ error: "you are not authenticated" })
  }
}

module.exports = auth
