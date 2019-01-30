import mongoose from 'mongoose'

const oneSecond = 1000
const oneMinute = oneSecond * 60
const oneHour = oneMinute * 60
const oneDay = oneHour * 24

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
    indVotesCount: { type: Number, default: 0 },
    totalPotentialVotesCount: { type: Number },
    delayMin: {
      type: Number,
      default: process.env.NODE_ENV === 'production' ? 5 * oneMinute : oneMinute
    },
    delayMax: {
      type: Number,
      default: process.env.NODE_ENV === 'production' ? 15 * oneMinute : oneHour
    },
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
