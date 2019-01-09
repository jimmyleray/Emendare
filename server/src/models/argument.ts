import mongoose from 'mongoose'

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

export default class Argument {
  static get model(): any {
    return model
  }
}
