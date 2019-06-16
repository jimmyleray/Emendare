import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { UserService, AuthService } from 'src/services'
import { Inject } from '@nestjs/common'
import { withTryCatch, withResponse, withAuthentication } from 'src/decorators'
import { IMessage } from 'src/../../interfaces'

@WebSocketGateway()
export class UserGateway {
  constructor(
    @Inject('UserService')
    private readonly userService: UserService,
    @Inject('AuthService')
    private readonly authService: AuthService
  ) {}

  @WebSocketServer()
  io: Server

  @SubscribeMessage('user')
  @withResponse('user')
  @withTryCatch
  @withAuthentication
  async handlerUser(client: Socket, message: IMessage<{}>) {
    const { id } = this.authService.decodeToken(message.token)
    const user = await this.userService.getUser(id)
    return { data: user }
  }

  @SubscribeMessage('activation')
  @withResponse('activation')
  @withTryCatch
  async handleActication(client: Socket, message: { activationToken: string }) {
    return this.userService.activateUser(message.activationToken)
  }

  @SubscribeMessage('login')
  @withResponse('login')
  @withTryCatch
  async handleLogin(client: Socket, message: IMessage<any>) {
    return this.userService.login(message.data, message.token)
  }

  @SubscribeMessage('subscribe')
  @withResponse('subscribe')
  @withTryCatch
  async handleSubscribe(
    client: Socket,
    message: IMessage<{ email: string; password: string }>
  ) {
    return this.userService.subscribe(message.data)
  }

  @SubscribeMessage('resetPassword')
  @withResponse('resetPassword')
  @withTryCatch
  @withAuthentication
  async handleResetPassword(
    client: Socket,
    message: IMessage<{ email: string }>
  ) {
    return this.userService.resetPassword(message.data)
  }

  @SubscribeMessage('deleteAccount')
  @withResponse('deleteAccount')
  @withTryCatch
  @withAuthentication
  async handleDeleteAccount(client: Socket, message: IMessage<{}>) {
    return this.userService.delete(message.data, this.io)
  }

  @SubscribeMessage('updateEmail')
  @withResponse('updateEmail')
  @withTryCatch
  @withAuthentication
  async handleUpdateEmail(
    client: Socket,
    message: IMessage<{ email: string }>
  ) {
    return this.userService.updateEmail(message.data)
  }

  @SubscribeMessage('updatePassword')
  @withResponse('updatePassword')
  @withTryCatch
  @withAuthentication
  async handleUpdatePassword(
    client: Socket,
    message: IMessage<{ password: string }>
  ) {
    return this.userService.updatePassword(message.data)
  }

  @SubscribeMessage('updateLastEvent')
  @withResponse('user')
  @withTryCatch
  @withAuthentication
  async handleUpdateLastEvent(client: Socket, message: IMessage<{}>) {
    return this.userService.updateLastEventDate(message.data)
  }

  @SubscribeMessage('toggleNotificationSetting')
  @withResponse('user')
  @withTryCatch
  @withAuthentication
  async handleToggleNotificationSetting(
    client: Socket,
    message: IMessage<{ key: string }>
  ) {
    return this.userService.toggleNotificationSetting(message.data)
  }
}
