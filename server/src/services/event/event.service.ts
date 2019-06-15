import { Injectable } from '@nestjs/common'
// Interfaces
import { IResponse } from '../../../../interfaces'
// Entities
import { Event } from '../../entities'

@Injectable()
export class EventService {
  async getEvent(id: string): Promise<IResponse<Event>> {
    const data = await Event.findOne(id)
    return { data }
  }

  async getEvents(): Promise<IResponse<Event[]>> {
    const data = await Event.find({ order: { created: 'DESC' } })
    return { data }
  }

  async getEventsByGroup(
    limit: number = 10,
    lastEventDate?: string
  ): Promise<IResponse<{ events: Event[]; hasNextPage: boolean }>> {
    if (!lastEventDate) {
      const data = await Event.find({
        take: limit,
        order: { created: 'DESC' }
      })
      return {
        data: {
          events: data,
          hasNextPage: await this.hasNextPage(data)
        }
      }
    } else {
      const data = await Event.find({
        where: { created: { $lt: new Date(lastEventDate) } },
        take: limit,
        order: { created: 'DESC' }
      })
      return {
        data: {
          events: data,
          hasNextPage: await this.hasNextPage(data)
        }
      }
    }
  }

  async hasNextPage(newData: Event[]) {
    if (newData.length === 0) {
      return false
    }
    // get the oldest date of the new events we are going to send
    const lastEventDate = newData[newData.length - 1].created
    // Check if there are more events to load after
    return (
      (await Event.find({
        where: { created: { $gt: new Date(lastEventDate) } },
        take: 1
      })).length !== 0
    )
  }
}
