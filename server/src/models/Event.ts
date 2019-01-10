import mongoose from 'mongoose'

const model = mongoose.model(
  'Event',
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    targetType: { type: String, required: true },
    target: { type: String, default: JSON.stringify({}) }
  })
)

export class Event {
  static get model(): any {
    return model
  }
}
