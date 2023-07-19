const mongoose = require("mongoose")

const BmiSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      height: {
        type: Number
      },
      weight: {
        type: Number
      },
      bmi: {
        type: Number
      },
})
const BmiModel = mongoose.model("bmi",BmiSchema)

module.exports = BmiModel