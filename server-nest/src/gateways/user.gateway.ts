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
  constructor(private userService: UserService) {}
  @WebSocketServer()
  io: Server

  @SubscribeMessage('user')
  async handlerUser(client: Socket, data: { token: string }) {
    const { token } = data
    if (token && Auth.isTokenValid(token)) {
      if (!Auth.isTokenExpired(token)) {
        try {
          const { id } = Auth.decodeToken(token)
          const data = await this.userService.getUser(id)
          if (data) {
            return { data }
          } else {
            return {
              error: {
                code: 401,
                message: "Cet utilisateur n'est pas connecté"
              }
            }
          }
        } catch (error) {
          console.error(error)
        }
      } else {
        return {
          error: { code: 405, message: 'Le token est expiré' }
        }
      }
    } else {
      return {
        error: { code: 405, message: 'Le token est invalide' }
      }
    }
  }

  @SubscribeMessage('activation')
  async handleActication(client: Socket, data: { activationToken: string }) {
    return await this.userService.activateUser(data.activationToken)
  }

  @SubscribeMessage('login')
  async handleLogin(client: Socket, data: { token: string; data: any }) {
    const { token } = data
    const { email, password } = data.data

    if (!data && token) {
      return await this.userService.login(undefined, undefined, token)
    } else if (data) {
      return await this.userService.login(email, password, token)
    } else {
      return {
        error: {
          code: 405,
          message: 'La requête est invalide'
        }
      }
    }
  }

  @SubscribeMessage('subscribe')
  async handleSubscribe(
    client: Socket,
    data: { email: string; password: string }
  ) {
    if (data.email && data.password) {
      return await this.userService.subscribe(data.email, data.password)
    }
  }

  @SubscribeMessage('resetPassword')
  async handleResetPassword(client: Socket, data: { data: { email: string } }) {
    try {
      return await this.userService.resetPassword(data.data.email)
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('deleteAccount')
  async handleDeleteAccount(client: Socket, data: { token: string }) {
    return await this.userService.delete(data.token, this.io)
  }

  @SubscribeMessage('updateEmail')
  async handleUpdateEmail(
    client: Socket,
    data: { token: string; data: { email: string } }
  ) {
    if (data.data.email) {
      return await this.userService.updateEmail(data.data.email, data.token)
    }
  }

  @SubscribeMessage('updatePassword')
  async handleUpdatePassword(
    client: Socket,
    data: { token: string; data: { password: string } }
  ) {
    try {
      return await this.userService.updatePassword(
        data.data.password,
        data.token
      )
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
