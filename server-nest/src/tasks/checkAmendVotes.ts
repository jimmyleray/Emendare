import { Injectable } from '@nestjs/common'
import { Interval, NestSchedule } from 'nest-schedule'
import { WebSocketServer, WebSocketGateway } from '@nestjs/websockets'
// Services
import { AmendService } from '../services'
import { Server } from 'socket.io'

@Injectable()
@WebSocketGateway()
export class CheckAmendVoteTask extends NestSchedule {
  constructor(private amendService: AmendService) {
    super()
  }

  @WebSocketServer()
  io: Server

  @Interval(5000)
  CheckAmendVoteTask() {
    if (this.io) {
      this.amendService.checkAmendVotes(this.io)
    }
  }
}
