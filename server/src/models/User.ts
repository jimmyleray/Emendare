import mongoose from 'mongoose'

const model = mongoose.model(
  'User',
  new mongoose.Schema({
    activated: {
      type: Boolean,
      default: process.env.NODE_ENV !== 'production'
    },
    password: { type: String, required: true },
    email: { type: String, required: true },
    created: { type: Date, default: Date.now },
    token: { type: String, default: null },
    activationToken: { type: String, default: null },
    followedGroups: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
      default: []
    },
    followedTexts: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Text' }],
      default: []
    },
    amends: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amend' }],
      default: []
    },
    upVotes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amend' }],
      default: []
    },
    downVotes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amend' }],
      default: []
    },
    indVotes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amend' }],
      default: []
    }
  })
)

export class User {
  static get model(): any {
    return model
  }
}
