const mongoose = require("mongoose")

const main = async () => {
  const localUri = "mongodb://127.0.0.1:27017/peroidic-table-api5"
  const uri = process.env.MONGODB_URI || localUri
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("successfully connected to the database")
  } catch (e) {
    console.log(e)
  }
}

main()

module.exports = mongoose
