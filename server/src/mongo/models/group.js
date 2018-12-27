const mongoose = require('mongoose')

module.exports = mongoose.model(
  'Group',
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    rules: { type: mongoose.Schema.Types.ObjectId, ref: 'Text' },
    subgroups: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
      default: []
    },
    texts: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Text' }],
      default: []
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      default: null
    },
    whitelist: { type: [String], default: ['*'] }
  })
)
