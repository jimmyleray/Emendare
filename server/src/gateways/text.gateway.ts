import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { TextService } from 'src/services'
import { Inject } from '@nestjs/common'
import { withTryCatch } from 'src/decorators'

@WebSocketGateway()
export class TextGateway {
  constructor(
    @Inject('TextService')
    private readonly textService: TextService
  ) {}

  @WebSocketServer()
  io: Server

  @SubscribeMessage('text')
  @withTryCatch
  async handleText(client: Socket, message: { data: { id: string } }) {
    const response = await this.textService.getText(message.data.id)
    client.emit('text/' + message.data.id, response)
  }

  @SubscribeMessage('texts')
  @withTryCatch
  async handleTexts(client: Socket) {
    const response = await this.textService.getTexts()
    client.emit('texts', response)
  }

  @SubscribeMessage('followText')
  @withTryCatch
  async handleFollowText(
    client: Socket,
    message: { token: string; data: { id: string } }
  ) {
    const response = await this.textService.followText(
      message.data.id,
      message.token,
      this.io
    )

    client.emit('followText', response)
  }

  @SubscribeMessage('unFollowText')
  @withTryCatch
  async handleUnFollowText(
    client: Socket,
    message: { token: string; data: { id: string } }
  ) {
    const response = await this.textService.unFollowText(
      message.data.id,
      message.token,
      this.io
    )

    client.emit('unFollowText', response)
  }

  @SubscribeMessage('postText')
  @withTryCatch
  async handlePostText(
    client: Socket,
    message: { token: string; data: { name: string; description: string } }
  ) {
    const response = await this.textService.postText(
      message.data.name,
      message.data.description,
      message.token,
      this.io
    )

    client.emit('postText', response)
  }
}
