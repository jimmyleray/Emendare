import mongoose from 'mongoose'

const model = mongoose.model(
  'Group',
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    rules: { type: mongoose.Schema.Types.ObjectId, ref: 'Text' },
    followersCount: { type: Number, default: 0 },
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

export default class Group {
  static get model(): any {
    return model
  }
}
