const mongoose = require("mongoose")

const elementSchema = mongoose.Schema(
  {
    atomicNumber: { type: Number },
    symbol: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    atomicMass: String,
    cpkHexColor: String,
    electronicConfiguration: String,
    electronegativity: { type: Number },
    atomicRadius: { type: Number },
    ionRadius: String,
    vanDelWaalsRadius: { type: Number },
    ionizationEnergy: { type: Number },
    electronAffinity: { type: Number },
    oxidationStates: String,
    standardState: String,
    bondingType: String,
    meltingPoint: { type: Number },
    boilingPoint: { type: Number },
    density: { type: Number },
    groupBlock: String,
    yearDiscovered: { type: Number },
  },
  {
    timestamps: true,
  }
)

const Element = mongoose.model("elements", elementSchema)

module.exports = Element
