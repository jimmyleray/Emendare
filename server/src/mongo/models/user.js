const mongoose = require('mongoose')

module.exports = mongoose.model(
  'User',
  new mongoose.Schema({
    password: { type: String, required: true },
    email: { type: String, required: true },
    created: { type: Date, default: Date.now },
    token: { type: String, default: null },
    followedGroups: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
      default: []
    },
    followedTexts: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Text' }],
      default: []
    }
  })
)
