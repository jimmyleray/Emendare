import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
// Service
import { AmendService } from '../services'

@WebSocketGateway()
export class AmendGateway {
  constructor(private amendService: AmendService) {}
  @WebSocketServer()
  io: Server

  @SubscribeMessage('amend')
  async handleAmend(client: Socket, data: { data: { id: string } }) {
    try {
      client.emit(
        'amend/' + data.data.id,
        await this.amendService.getAmend(data.data.id)
      )
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('postAmend')
  async handlePostAmend(
    client: Socket,
    data: {
      token: string
      data: {
        name: string
        description: string
        patch: string
        version: number
        textID: string
      }
    }
  ) {
    try {
      return await this.amendService.postAmend(data.data, data.token, this.io)
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('upVoteAmend')
  async handleUpVoteAmend(
    client: Socket,
    data: { token: string; data: { id: string } }
  ) {
    try {
      return await this.amendService.upVoteAmend(
        data.data.id,
        data.token,
        this.io
      )
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('downVoteAmend')
  async handleDownVoteAmend(
    client: Socket,
    data: { token: string; data: { id: string } }
  ) {
    try {
      return await this.amendService.downVoteAmend(
        data.data.id,
        data.token,
        this.io
      )
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('indVoteAmend')
  async handleIndVoteAmend(
    client: Socket,
    data: { token: string; data: { id: string } }
  ) {
    try {
      return await this.amendService.upVoteAmend(
        data.data.id,
        data.token,
        this.io
      )
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('UnVoteAmend')
  async handleUnVoteAmend(
    client: Socket,
    data: { token: string; data: { id: string } }
  ) {
    try {
      return await this.amendService.unVoteAmend(
        data.data.id,
        data.token,
        this.io
      )
    } catch (error) {
      console.error(error)
    }
  }
}
