const mongoose = require('mongoose')

module.exports = mongoose.model(
  'Event',
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    targetType: { type: String, required: true },
    targetID: { type: String }
  })
)
