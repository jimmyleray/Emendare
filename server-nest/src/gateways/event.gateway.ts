import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
// Service
import { EventService, Auth } from '../services'

@WebSocketGateway()
export class EventGateway {
  constructor(private eventService: EventService) {}
  @WebSocketServer()
  io: Server

  @SubscribeMessage('event')
  async handleEvent(client: Socket, data: { data: { id: string } }) {
    try {
      return this.eventService.getEvent(data.data.id)
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('events')
  async handleEvents(
    client: Socket,
    data: { data: { limit: number; lastEventDate: any } }
  ) {
    try {
      return this.eventService.getEventsByGroup(
        data.data.limit,
        data.data.lastEventDate
      )
    } catch (error) {
      console.error(error)
    }
  }
}
