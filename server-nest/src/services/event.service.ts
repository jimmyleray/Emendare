import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
// Interfaces
import { IResponse } from '../../../interfaces'
// Entities
import { Event } from '../entities'

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>
  ) {}

  async getEvent(id: string): Promise<IResponse<Event>> {
    const data = await this.eventRepository.findOne(id)
    return { data }
  }

  async getEvents(): Promise<IResponse<Event[]>> {
    const data = await this.eventRepository.find({ order: { created: 'ASC' } })
    return { data }
  }

  async getEventsByGroup(
    limit: number = 10,
    lastEventDate?: string
  ): Promise<IResponse<{ events: Event[]; hasNextPage: boolean }>> {
    if (!lastEventDate) {
      const data = await this.eventRepository.find({
        take: limit,
        order: { created: 'ASC' }
      })

      return {
        data: {
          events: data,
          hasNextPage: await this.hasNextPage(data)
        }
      }
    } else {
      const data = await this.eventRepository.find({
        where: { created: { $lt: new Date(lastEventDate) } },
        take: limit,
        order: { created: 'ASC' }
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
      (await this.eventRepository.find({
        where: { created: { $lt: new Date(lastEventDate) } },
        take: 1
      })).length !== 0
    )
  }
}
