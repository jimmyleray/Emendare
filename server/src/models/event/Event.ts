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

  public static async getEvent(id: string): Promise<IResponse<IEvent>> {
    const data = await this.model.findById(id)
    return { data }
  }

  public static async getEvents(): Promise<IResponse<IEvent[]>> {
    const data = await this.model.find().sort('-created')
    return { data }
  }

  public static async getEventsByGroup(
    limit: number = 10,
    lastEventDate?: string
  ): Promise<IResponse<{ events: IEvent[]; hasNextPage: boolean }>> {
    if (!lastEventDate) {
      const data = await this.model
        .find()
        .limit(limit)
        .sort('-created')

      return {
        data: {
          events: data,
          hasNextPage: await this.hasNextPage(data)
        }
      }
    } else {
      const data = await this.model
        .find({ created: { $lt: new Date(lastEventDate) } })
        .limit(limit)
        .sort('-created')

      return {
        data: {
          events: data,
          hasNextPage: await this.hasNextPage(data)
        }
      }
    }
  }

  public static async hasNextPage(newData: IEvent[]) {
    if (newData.length === 0) {
      return false
    }
    // get the oldest date of the new events we are going to send
    const lastEventDate = newData[newData.length - 1].created
    // Check if there are more events to load after
    return (
      (await this.model
        .find({ created: { $lt: new Date(lastEventDate) } })
        .limit(1)).length !== 0
    )
  }
}
