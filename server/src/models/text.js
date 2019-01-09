const mongoose = require('mongoose')

const model = mongoose.model(
  'Text',
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    followersCount: { type: Number, default: 0 },
    actual: { type: String, default: '' },
    patches: { type: [String], default: [] },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true
    },
    amends: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amend' }],
      default: []
    },
    rules: { type: Boolean, default: false }
  })
)

module.exports = class Text {
  static get model() {
    return model
  }
}
