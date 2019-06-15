import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
// Service
import { EventService } from '../services'
import { Inject } from '@nestjs/common'

@WebSocketGateway()
export class EventGateway {
  constructor(
    @Inject('EventService') private readonly eventService: EventService
  ) {}
  @WebSocketServer()
  io: Server

  @SubscribeMessage('event')
  async handleEvent(client: Socket, data: { data: { id: string } }) {
    try {
      const response = await this.eventService.getEvent(data.data.id)
      client.emit('event', response)
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('events')
  async handleEvents(
    client: Socket,
    data: { token: any; data: { limit: number; lastEventDate: any } }
  ) {
    try {
      const response = await this.eventService.getEventsByGroup(
        data.data.limit,
        data.data.lastEventDate
      )
      client.emit('events', response)
    } catch (error) {
      console.error(error)
    }
  }
}
