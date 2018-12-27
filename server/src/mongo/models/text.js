const mongoose = require('mongoose')

module.exports = mongoose.model(
  'Text',
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    name: { type: String, default: '' },
    description: { type: String, default: '' },
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
    version: { type: Number, default: 0 },
    rules: { type: Boolean, default: false }
  })
)
