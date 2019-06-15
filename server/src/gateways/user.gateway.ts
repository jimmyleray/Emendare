import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { UserService, AuthService } from 'src/services'
import { Inject } from '@nestjs/common'
import { withTryCatch } from 'src/decorators'

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
  @withTryCatch
  async handlerUser(client: Socket, message: { token: string }) {
    const { token } = message

    if (token && this.authService.isTokenValid(token)) {
      if (!this.authService.isTokenExpired(token)) {
        const { id } = this.authService.decodeToken(token)
        const response = await this.userService.getUser(id)

        if (response) {
          client.emit('user', { data: response, error: null })
        } else {
          client.emit('user', {
            error: {
              code: 401,
              message: "Cet utilisateur n'est pas connecté"
            }
          })
        }
      } else {
        client.emit('user', {
          error: { code: 405, message: 'Le token est expiré' }
        })
      }
    } else {
      client.emit('user', {
        error: { code: 405, message: 'Le token est invalide' }
      })
    }
  }

  @SubscribeMessage('activation')
  @withTryCatch
  async handleActication(client: Socket, message: { activationToken: string }) {
    const response = await this.userService.activateUser(
      message.activationToken
    )
    client.emit('activation', response)
  }

  @SubscribeMessage('login')
  @withTryCatch
  async handleLogin(client: Socket, message: { token: string; data: any }) {
    const { token } = message
    const { email, password } = message.data
    let response: any

    if (!message && token) {
      response = await this.userService.login(undefined, undefined, token)
    } else if (message) {
      response = await this.userService.login(email, password, token)
    } else {
      response = {
        error: {
          code: 405,
          message: 'La requête est invalide'
        }
      }
    }

    client.emit('login', response)
  }

  @SubscribeMessage('subscribe')
  @withTryCatch
  async handleSubscribe(
    client: Socket,
    data: { token: string; message: { email: string; password: string } }
  ) {
    const response = await this.userService.subscribe(
      data.message.email,
      data.message.password
    )

    client.emit('subscribe', response)
  }

  @SubscribeMessage('resetPassword')
  @withTryCatch
  async handleResetPassword(
    client: Socket,
    message: { data: { email: string } }
  ) {
    const response = await this.userService.resetPassword(message.data.email)
    client.emit('resetPassword', response)
  }

  @SubscribeMessage('deleteAccount')
  @withTryCatch
  async handleDeleteAccount(client: Socket, message: { token: string }) {
    const response = await this.userService.delete(message.token, this.io)
    client.emit('deleteAccount', response)
  }

  @SubscribeMessage('updateEmail')
  @withTryCatch
  async handleUpdateEmail(
    client: Socket,
    message: { token: string; data: { email: string } }
  ) {
    if (message.data.email) {
      const response = await this.userService.updateEmail(
        message.data.email,
        message.token
      )

      client.emit('updateEmail', response)
    }
  }

  @SubscribeMessage('updatePassword')
  @withTryCatch
  async handleUpdatePassword(
    client: Socket,
    message: { token: string; data: { password: string } }
  ) {
    const response = await this.userService.updatePassword(
      message.data.password,
      message.token
    )

    client.emit('updatePassword', response)
  }

  @SubscribeMessage('updateLastEvent')
  @withTryCatch
  async handleUpdateLastEvent(client: Socket, message: { token: string }) {
    const response = await this.userService.updateLastEventDate(message.token)
    client.emit('user', response)
  }

  @SubscribeMessage('toggleNotificationSetting')
  @withTryCatch
  async handleToggleNotificationSetting(
    client: Socket,
    message: { token: string; data: { key: string } }
  ) {
    const response = await this.userService.toggleNotificationSetting(
      message.data.key,
      message.token
    )

    client.emit('user', response)
  }
}
