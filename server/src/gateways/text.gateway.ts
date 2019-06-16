import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { TextService, AuthService } from 'src/services'
import { Inject } from '@nestjs/common'
import { withTryCatch, withResponse, withAuthentication } from 'src/decorators'
import { IMessage } from 'src/../../interfaces'

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
    return this.textService.getTexts()
  }

  @SubscribeMessage('followText')
  @withResponse('followText')
  @withTryCatch
  @withAuthentication
  async handleFollowText(client: Socket, message: IMessage<{ id: string }>) {
    return this.textService.followText(message.data, this.io)
  }

  @SubscribeMessage('unFollowText')
  @withResponse('unFollowText')
  @withTryCatch
  @withAuthentication
  async handleUnFollowText(client: Socket, message: IMessage<{ id: string }>) {
    return this.textService.unFollowText(message.data, this.io)
  }

  @SubscribeMessage('postText')
  @withResponse('postText')
  @withTryCatch
  @withAuthentication
  async handlePostText(
    client: Socket,
    message: IMessage<{ name: string; description: string }>
  ) {
    return this.textService.postText(message.data, this.io)
  }
}
