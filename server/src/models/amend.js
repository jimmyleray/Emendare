const mongoose = require('mongoose')

const model = mongoose.model(
  'Amend',
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    patch: { type: String, required: true },
    version: { type: Number, required: true },
    text: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Text',
      required: true
    },
    arguments: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Argument' }],
      default: []
    },
    upVotesCount: { type: Number, default: 0 },
    downVotesCount: { type: Number, default: 0 },
    delayMin: { type: Number, default: 3600 * 1000 },
    delayMax: { type: Number, default: 3600 * 1000 * 24 },
    closed: { type: Boolean, default: false },
    accepted: { type: Boolean, default: false }
  })
)

module.exports = class Amend {
  static get model() {
    return model
  }
}
