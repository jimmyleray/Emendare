import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
// Service
import { AmendService } from '../services'
import { Inject } from '@nestjs/common'

@WebSocketGateway()
export class AmendGateway {
  constructor(
    @Inject('AmendService') private readonly amendService: AmendService
  ) {}

  @WebSocketServer()
  io: Server

  @SubscribeMessage('amend')
  async handleAmend(client: Socket, data: { data: { id: string } }) {
    try {
      const response = await this.amendService.getAmend(data.data.id)
      client.emit('amend/' + data.data.id, response)
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
      const response = await this.amendService.postAmend(
        data.data,
        data.token,
        this.io
      )
      client.emit('postAmend', response)
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
      const response = await this.amendService.upVoteAmend(
        data.data.id,
        data.token,
        this.io
      )
      client.emit('upVoteAmend', response)
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
      const response = await this.amendService.downVoteAmend(
        data.data.id,
        data.token,
        this.io
      )
      client.emit('downVoteAmend', response)
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
      const response = await this.amendService.upVoteAmend(
        data.data.id,
        data.token,
        this.io
      )
      client.emit('indVoteAmend', response)
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('unVoteAmend')
  async handleUnVoteAmend(
    client: Socket,
    data: { token: string; data: { id: string } }
  ) {
    try {
      const response = await this.amendService.unVoteAmend(
        data.data.id,
        data.token,
        this.io
      )
      client.emit('unVoteAmend', response)
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('postArgument')
  async handlePostArgument(
    client: Socket,
    data: {
      token: string
      data: { amendID: string; text: string; type: string }
    }
  ) {
    try {
      const response: any = await this.amendService.postArgument(
        data.data.text,
        data.data.type,
        data.data.amendID,
        data.token
      )
      if (response.data) {
        this.io.emit(`amend/${data.data.amendID}`, response)
      } else {
        client.emit('postArgument', response)
      }
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('upVoteArgument')
  async handleUpVoteArgument(
    client: Socket,
    data: { token: string; data: { amendID: string; argumentID: string } }
  ) {
    try {
      const response: any = await this.amendService.upVoteArgument(
        data.data.amendID,
        data.data.argumentID,
        data.token
      )
      if (response.data) {
        this.io.emit(`amend/${data.data.amendID}`, response)
      } else {
        client.emit('upVoteArgument', response)
      }
    } catch (error) {
      console.error(error)
    }
  }

  @SubscribeMessage('downVoteArgument')
  async handleDownVoteArgument(
    client: Socket,
    data: { token: string; data: { amendID: string; argumentID: string } }
  ) {
    try {
      const response: any = await this.amendService.downVoteArgument(
        data.data.amendID,
        data.data.argumentID,
        data.token
      )
      if (response.data) {
        this.io.emit(`amend/${data.data.amendID}`, response)
      } else {
        client.emit('unVoteArgument', response)
      }
    } catch (error) {
      console.error(error)
    }
  }
  @SubscribeMessage('unVoteArgument')
  async handleUnVoteArgument(
    client: Socket,
    data: { token: string; data: { amendID: string; argumentID: string } }
  ) {
    try {
      const response: any = await this.amendService.unVoteArgument(
        data.data.amendID,
        data.data.argumentID,
        data.token
      )
      if (response.data) {
        this.io.emit(`amend/${data.data.amendID}`, response)
      } else {
        client.emit('unVoteArgument', response)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
