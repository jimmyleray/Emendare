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
    commits: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Commit' }],
      default: []
    },
    updated: { type: Date, default: Date.now },
    rules: { type: Boolean, default: false }
  })
)
