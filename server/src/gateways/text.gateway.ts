import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { TextService, AuthService } from '../services'
import { Inject } from '@nestjs/common'
import { withTryCatch, withResponse, withAuthentication } from '../common'
import { IMessage } from '../../../interfaces'

@WebSocketGateway()
export class TextGateway {
  constructor(
    @Inject('AuthService')
    private readonly authService: AuthService,
    @Inject('TextService')
    private readonly textService: TextService
  ) {}

  @WebSocketServer()
  io: Server

  @SubscribeMessage('text')
  @withTryCatch
  async handleText(client: Socket, message: IMessage<{ id: string }>) {
    const response = await this.textService.getText(message.data.id)
    client.emit('text/' + message.data.id, response)
  }

  @SubscribeMessage('texts')
  @withResponse('texts')
  @withTryCatch
  async handleTexts(client: Socket) {
    return await this.textService.getTexts()
  }

  @SubscribeMessage('followText')
  @withResponse('followText')
  @withTryCatch
  @withAuthentication
  async handleFollowText(client: Socket, message: IMessage<{ id: string }>) {
    return await this.textService.followText(message.data, this.io)
  }

  @SubscribeMessage('unFollowText')
  @withResponse('unFollowText')
  @withTryCatch
  @withAuthentication
  async handleUnFollowText(client: Socket, message: IMessage<{ id: string }>) {
    return await this.textService.unFollowText(message.data, this.io)
  }

  @SubscribeMessage('postText')
  @withResponse('postText')
  @withTryCatch
  @withAuthentication
  async handlePostText(
    client: Socket,
    message: IMessage<{ name: string; description: string }>
  ) {
    const { event, ...rest } = await this.textService.postText(
      message.data,
      this.io
    )
    return rest
  }
}
