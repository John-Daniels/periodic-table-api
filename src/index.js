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
const usersRouter = require("./routers/users")

// additional pages for (404)
const public = path.resolve(__dirname, "../public")

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
// use this when debuging
// app.use(morgan("dev"))
app.use(express.json(public))

app.use("/api/users", usersRouter)
app.use("/api/elements", elementsRouter)

// 404
app.use("/*", express.static(public))
// app.use("/*", (req, res) => {
//   // res.redirect("https://github.com/John-Daniels/periodic-table-api")

//   res.send()
// })

app.listen(port, () => console.log(`server is up at port ${port}`))
