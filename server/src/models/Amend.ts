import mongoose from 'mongoose'

const model = mongoose.model(
  'Amend',
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    finished: { type: Date },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    patch: { type: String, required: true },
    version: { type: Number, default: 0 },
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
    totalPotentialVotesCount: { type: Number },
    delayMin: {
      type: Number,
      default: process.env.NODE_ENV === 'production' ? 60 * 60 * 1000 : 0
    },
    delayMax: { type: Number, default: 24 * 60 * 60 * 1000 },
    closed: { type: Boolean, default: false },
    accepted: { type: Boolean, default: false },
    conflicted: { type: Boolean, default: false }
  })
)

export class Amend {
  static get model(): any {
    return model
  }
}
