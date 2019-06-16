import { Injectable } from '@nestjs/common'
import { IResponse } from '../../../../interfaces'
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
    let events

    if (!lastEventDate) {
      events = await Event.find({ take: limit, order: { created: 'DESC' } })
    } else {
      events = await Event.find({
        where: { created: { $lt: new Date(lastEventDate) } },
        take: limit,
        order: { created: 'DESC' }
      })
    }

    const hasNextPage = await this.hasNextPage(events)
    return { data: { events, hasNextPage } }
  }

  async hasNextPage(newData: Event[]): Promise<boolean> {
    if (newData.length === 0) {
      return false
    }

    // get the oldest date of the new events we are going to send
    const lastEventDate = newData[newData.length - 1].created

    // Check if there are more events to load after
    const newEvents = await Event.find({
      where: { created: { $gt: new Date(lastEventDate) } },
      take: 1
    })

    return newEvents.length !== 0
  }
}
