const mongoose = require('mongoose')

module.exports = mongoose.model(
  'Amend',
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    patch: { type: String, required: true },
    version: { type: Number, required: true },
    text: { type: mongoose.Schema.Types.ObjectId, ref: 'Text', required: true },
    updated: { type: Date, default: Date.now }
  })
)
