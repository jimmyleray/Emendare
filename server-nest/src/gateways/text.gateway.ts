import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
// Service
import { TextService } from '../services'

@WebSocketGateway()
export class TextGateway {
  constructor(private textService: TextService) {}
  @WebSocketServer()
  io: Server

  @SubscribeMessage('text')
  async handleText(client: Socket, data: { data: { id: string } }) {
    try {
      return await this.textService.getText(data.data.id)
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('texts')
  async handleTexts() {
    try {
      return await this.textService.getTexts()
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('followText')
  async handleFollowText(
    client: Socket,
    data: { token: string; data: { id: string } }
  ) {
    try {
      return await this.textService.followText(
        data.data.id,
        data.token,
        this.io
      )
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('unFollowText')
  async handleUnFollowText(
    client: Socket,
    data: { token: string; data: { id: string } }
  ) {
    try {
      return await this.textService.unFollowText(
        data.data.id,
        data.token,
        this.io
      )
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('postText')
  async handlePostText(
    client: Socket,
    data: { token: string; data: { name: string; description: string } }
  ) {
    try {
      return await this.textService.postText(
        data.data.name,
        data.data.description,
        data.token,
        this.io
      )
    } catch (error) {
      console.error(error)
    }
  }
}
