const mongoose = require("mongoose")

const elementSchema = mongoose.Schema(
  {
    atomicNumber: Number,
    symbol: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    atomicMass: String,
    cpkHexColor: String,
    electronicConfiguration: String,
    electronegativity: Number,
    atomicRadius: Number,
    ionRadius: String,
    vanDelWaalsRadius: Number,
    ionizationEnergy: Number,
    electronAffinity: Number,
    oxidationStates: String,
    standardState: String,
    bondingType: String,
    meltingPoint: Number,
    boilingPoint: Number,
    density: Number,
    groupBlock: String,
    yearDiscovered: Number,
  },
  {
    timestamps: true,
  }
)

const Element = mongoose.model("elements", elementSchema)

module.exports = Element
