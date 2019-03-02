import mongoose from 'mongoose'
import { IEvent, IResponse } from '../../../../interfaces'

const model = mongoose.model(
  'Event',
  new mongoose.Schema({
    created: { type: Date, default: Date.now },
    target: {
      type: { type: String, required: true },
      id: { type: mongoose.Schema.Types.ObjectId, required: true }
    }
  })
)

export class Event {
  public static get model(): any {
    return model
  }

  public static async getEvents(): Promise<IResponse<IEvent[]>> {
    const data = await this.model.find().sort('-created')
    return { data }
  }
}
