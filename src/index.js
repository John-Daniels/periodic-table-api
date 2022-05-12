const dotenv = require("dotenv")
//initialize dotenv
dotenv.config() // provide your mongodb uri in the .env file (*_*)

// let db run first
require("./db/mongoose")

const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")

//routers
const elementsRouter = require("./routers/elements")

// additional pages for (404)
const public = path.resolve(__dirname, "../public")

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.use("/api/elements", elementsRouter)

// choose your own routes
app.use("/*", (req, res) => {
  res.redirect("http://google.com")
})

const main = () => {
  const Elements = require("./models/element")
}

app.listen(port, () => console.log(`server is up at port ${port}`))
