import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { EventService } from 'src/services'
import { Inject } from '@nestjs/common'
import { withTryCatch } from 'src/decorators'

@WebSocketGateway()
export class EventGateway {
  constructor(
    @Inject('EventService')
    private readonly eventService: EventService
  ) {}

  @WebSocketServer()
  io: Server

  @SubscribeMessage('event')
  @withTryCatch
  async handleEvent(client: Socket, data: { data: { id: string } }) {
    const response = await this.eventService.getEvent(data.data.id)
    client.emit('event', response)
  }

  @SubscribeMessage('events')
  @withTryCatch
  async handleEvents(
    client: Socket,
    data: { token: any; data: { limit: number; lastEventDate: any } }
  ) {
    const response = await this.eventService.getEventsByGroup(
      data.data.limit,
      data.data.lastEventDate
    )

    client.emit('events', response)
  }
}
