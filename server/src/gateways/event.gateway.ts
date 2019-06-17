import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { EventService } from '../services'
import { Inject } from '@nestjs/common'
import { withTryCatch, withResponse } from '../decorators'

@WebSocketGateway()
export class EventGateway {
  constructor(
    @Inject('EventService')
    private readonly eventService: EventService
  ) {}

  @WebSocketServer()
  io: Server

  @SubscribeMessage('event')
  @withResponse('event')
  @withTryCatch
  async handleEvent(client: Socket, message: { data: { id: string } }) {
    return await this.eventService.getEvent(message.data.id)
  }

  @SubscribeMessage('events')
  @withResponse('events')
  @withTryCatch
  async handleEvents(
    client: Socket,
    message: { token: string; data: { limit: number; lastEventDate: any } }
  ) {
    return await this.eventService.getEventsByGroup(
      message.data.limit,
      message.data.lastEventDate
    )
  }
}
