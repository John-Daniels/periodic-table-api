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
const Element = require("./models/element")

// additional pages for (404)
const public = path.resolve(__dirname, "../public")

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.use("/api/elements", elementsRouter)

// 404
app.use("/*", (req, res) => {
  res.redirect("https://github.com/John-Daniels/periodic-table-api")
})

const main = async () => {
  const fs = require("fs")

  const dbDir = path.resolve(__dirname, "../data.json")
  const dataBuf = fs.readFileSync(dbDir)
  const _elements = JSON.parse(dataBuf)

  // List < Map < String,
  //   dynamic >>
  _elements.forEach(async (element) => {
    if (element.yearDiscovered === "Ancient") {
      element.yearDiscovered = null
    }
    function isArray(o) {
      return Object.prototype.toString.call(o) === "[object Array]"
    }
    if (isArray(element.atomicMass)) {
      element.atomicMass = element.atomicMass[0].toString()
    }
    const newElement = Element(element)
    const e = await newElement.save()
    console.log(`copied ${e.symbol}`)
  })

  // for (var e of _elements) {
  //   console.log(Object.keys)
  //   break
  // }
}

main()

app.listen(port, () => console.log(`server is up at port ${port}`))
