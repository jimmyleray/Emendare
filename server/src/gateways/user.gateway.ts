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
  async handlerUser(client: Socket, data: { token: string }) {
    const { token } = data
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
  async handleActication(client: Socket, data: { activationToken: string }) {
    const response = await this.userService.activateUser(data.activationToken)
    client.emit('activation', response)
  }

  @SubscribeMessage('login')
  @withTryCatch
  async handleLogin(client: Socket, data: { token: string; data: any }) {
    const { token } = data
    const { email, password } = data.data
    let response: any

    if (!data && token) {
      response = await this.userService.login(undefined, undefined, token)
    } else if (data) {
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
    data: { token: any; data: { email: string; password: string } }
  ) {
    const response = await this.userService.subscribe(
      data.data.email,
      data.data.password
    )

    client.emit('subscribe', response)
  }

  @SubscribeMessage('resetPassword')
  @withTryCatch
  async handleResetPassword(client: Socket, data: { data: { email: string } }) {
    const response = await this.userService.resetPassword(data.data.email)
    client.emit('resetPassword', response)
  }

  @SubscribeMessage('deleteAccount')
  @withTryCatch
  async handleDeleteAccount(client: Socket, data: { token: string }) {
    const response = await this.userService.delete(data.token, this.io)
    client.emit('deleteAccount', response)
  }

  @SubscribeMessage('updateEmail')
  @withTryCatch
  async handleUpdateEmail(
    client: Socket,
    data: { token: string; data: { email: string } }
  ) {
    if (data.data.email) {
      const response = await this.userService.updateEmail(
        data.data.email,
        data.token
      )

      client.emit('updateEmail', response)
    }
  }

  @SubscribeMessage('updatePassword')
  @withTryCatch
  async handleUpdatePassword(
    client: Socket,
    data: { token: string; data: { password: string } }
  ) {
    const response = await this.userService.updatePassword(
      data.data.password,
      data.token
    )

    client.emit('updatePassword', response)
  }

  @SubscribeMessage('updateLastEvent')
  @withTryCatch
  async handleUpdateLastEvent(client: Socket, data: { token: string }) {
    const response = await this.userService.updateLastEventDate(data.token)
    client.emit('user', response)
  }

  @SubscribeMessage('toggleNotificationSetting')
  @withTryCatch
  async handleToggleNotificationSetting(
    client: Socket,
    data: { token: string; data: { key: any } }
  ) {
    const response = await this.userService.toggleNotificationSetting(
      data.data.key,
      data.token
    )

    client.emit('user', response)
  }
}
