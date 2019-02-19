import mongoose from 'mongoose'

const model = mongoose.model(
  'Event',
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    targetType: { type: String, required: true },
    targetID: { type: mongoose.Schema.Types.ObjectId, required: true }
  })
)

export class Event {
  public static get model(): any {
    return model
  }

  public static async getEvents(): Promise<any> {
    return await this.model.find().sort('-created')
  }
}
