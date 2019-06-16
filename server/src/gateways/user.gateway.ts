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
    const { email, password } = message.data
    return this.userService.login(email, password, message.token)
  }

  @SubscribeMessage('subscribe')
  @withResponse('subscribe')
  @withTryCatch
  async handleSubscribe(
    client: Socket,
    message: IMessage<{ email: string; password: string }>
  ) {
    return this.userService.subscribe(message.data.email, message.data.password)
  }

  @SubscribeMessage('resetPassword')
  @withResponse('resetPassword')
  @withTryCatch
  async handleResetPassword(
    client: Socket,
    message: IMessage<{ email: string }>
  ) {
    return this.userService.resetPassword(message.data.email)
  }

  @SubscribeMessage('deleteAccount')
  @withResponse('deleteAccount')
  @withTryCatch
  async handleDeleteAccount(client: Socket, message: IMessage<{}>) {
    return this.userService.delete(message.token, this.io)
  }

  @SubscribeMessage('updateEmail')
  @withResponse('updateEmail')
  @withTryCatch
  async handleUpdateEmail(
    client: Socket,
    message: IMessage<{ email: string }>
  ) {
    return this.userService.updateEmail(message.data.email, message.token)
  }

  @SubscribeMessage('updatePassword')
  @withResponse('updatePassword')
  @withTryCatch
  async handleUpdatePassword(
    client: Socket,
    message: IMessage<{ password: string }>
  ) {
    return this.userService.updatePassword(message.data.password, message.token)
  }

  @SubscribeMessage('updateLastEvent')
  @withResponse('user')
  @withTryCatch
  async handleUpdateLastEvent(client: Socket, message: IMessage<{}>) {
    return this.userService.updateLastEventDate(message.token)
  }

  @SubscribeMessage('toggleNotificationSetting')
  @withResponse('user')
  @withTryCatch
  async handleToggleNotificationSetting(
    client: Socket,
    message: IMessage<{ key: string }>
  ) {
    return this.userService.toggleNotificationSetting(
      message.data.key,
      message.token
    )
  }
}
