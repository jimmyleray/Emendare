import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
// Service
import { UserService, Auth } from '../services'

@WebSocketGateway()
export class UserGateway {
  constructor(private userService: UserService, private auth: Auth) {}
  @WebSocketServer()
  io: Server

  @SubscribeMessage('user')
  async handlerUser(client: Socket, data: { token: string }) {
    const { token } = data
    if (token && this.auth.isTokenValid(token)) {
      if (!this.auth.isTokenExpired(token)) {
        try {
          const { id } = this.auth.decodeToken(token)
          const response = await this.userService.getUser(id)
          if (response) {
            client.emit('user', response)
          } else {
            client.emit('user', {
              error: {
                code: 401,
                message: "Cet utilisateur n'est pas connecté"
              }
            })
          }
        } catch (error) {
          console.error(error)
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
  async handleActication(client: Socket, data: { activationToken: string }) {
    const response = await this.userService.activateUser(data.activationToken)
    client.emit('activation', response)
  }

  @SubscribeMessage('login')
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
  async handleSubscribe(
    client: Socket,
    data: { token: any; data: { email: string; password: string } }
  ) {
    try {
      const response = await this.userService.subscribe(
        data.data.email,
        data.data.password
      )
      client.emit('subscribe', response)
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('resetPassword')
  async handleResetPassword(client: Socket, data: { data: { email: string } }) {
    try {
      const response = await this.userService.resetPassword(data.data.email)
      client.emit('resetPassword', response)
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('deleteAccount')
  async handleDeleteAccount(client: Socket, data: { token: string }) {
    const response = await this.userService.delete(data.token, this.io)
    client.emit('deleteAccount', response)
  }

  @SubscribeMessage('updateEmail')
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
  async handleUpdatePassword(
    client: Socket,
    data: { token: string; data: { password: string } }
  ) {
    try {
      const response = await this.userService.updatePassword(
        data.data.password,
        data.token
      )
      client.emit('updatePassword', response)
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('updateLastEvent')
  async handleUpdateLastEvent(client: Socket, data: { token: string }) {
    try {
      const response = await this.userService.updateLastEventDate(data.token)
      client.emit('user', response)
      return response
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('toggleNotificationSetting')
  async handleToggleNotificationSetting(
    client: Socket,
    data: { token: string; data: { key: any } }
  ) {
    try {
      const response = await this.userService.toggleNotificationSetting(
        data.data.key,
        data.token
      )
      client.emit('user', response)
      return response
    } catch (error) {
      console.error(error)
    }
  }
}
