const mongoose = require('mongoose')

module.exports = mongoose.model(
  'Vote',
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    finished: { type: Date, default: Date.now },
    amend: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Amend',
      required: true
    },
    upVotes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: []
    },
    downVotes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
      default: []
    },
    accepted: { type: Boolean, default: false }
  })
)
