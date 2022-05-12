const express = require("express")
const Element = require("../models/element")

const router = new express.Router()

// GET elements
// ?sort=1&limit=5
router.get("/", async (req, res) => {
  let filters = {}
  try {
    if (req.query.sort) filter["sort"] = req.query.sort == "desc" ? -1 : 1
    if (req.query.limit) filter["limit"] = parseInt(req.query.limit)

    const { sort, limit } = filters
    const elements = await Element.find()
      .sort({
        desc: sort,
      })
      .limit(limit)

    res.send(elements)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
})

//get element by name
router.get("/:name", async (req, res) => {
  try {
    const element = await Element.findOne({ name: req.params.name })

    if (!element) res.status(400).send({ error: "Element Not Found" })
    res.send(element)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

router.post("/create", async (req, res) => {
  try {
    const newElement = req.body
    // custom messages
    const checkElement = await Element.findOne({ symbol: newElement.symbol })
    if (checkElement !== null)
      return res
        .status(400)
        .send({ general: `${newElement.name}, is already Defined!!!, ` })

    const element = Element(newElement)
    await element.save()

    res.status(201).send(element)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

router.patch("/update/:id", async (req, res) => {
  const element = await Element.findOne({ _id: req.params.id })
  // check where that element exists
  if (!element) res.status(400).send({ error: "Element Not Found" })

  const updates = Object.keys(req.body)
  const allowedUpdates = [
    "atomicNumber",
    "symbol",
    "name",
    "atomicMass",
    "cpkHexColor",
    "electronicConfiguration",
    "electronegativity",
    "atomicRadius",
    "ionRadius",
    "vanDelWaalsRadius",
    "ionizationEnergy",
    "electronAffinity",
    "oxidationStates",
    "standardState",
    "bondingType",
    "meltingPoint",
    "boilingPoint",
    "density",
    "groupBlock",
    "yearDiscovered",
  ]

  const isValidOp = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOp) return res.status(400).send({ error: "Bad request" })
  try {
    updates.forEach((update) => (element[update] = req.body[update]))
    await element.save()

    res.send(element)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
})

router.delete("/delete/:name", async (req, res) => {
  try {
    const element = await Element.findOne({ name: req.params.name })
    // check where that element exists
    if (!element) res.status(400).send({ error: "Element Not Found" })

    await element.remove()

    res.send({ general: "Succesful" })
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

module.exports = router
// MONGODB_URI=mongodb+srv://John-Daniels:coders.js@peroidic-table.lwj7o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
