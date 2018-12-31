const mongoose = require('mongoose')

const model = mongoose.model(
  'Argument',
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    text: { type: String, required: true },
    favorable: { type: Boolean, default: true },
    amend: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Amend',
      required: true
    },
    upThumbCount: { type: Number, default: 0 }
  })
)

module.exports = class Argument {
  static get model() {
    return model
  }
}
