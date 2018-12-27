const mongoose = require('mongoose')

module.exports = mongoose.model(
  'Event',
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    title: { type: String, required: true },
    text: { type: String, default: '' },
    color: { type: String, default: '' },
    icon: { type: String, default: '' },
    url: { type: String, default: '' }
  })
)
