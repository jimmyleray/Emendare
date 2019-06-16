import { Injectable, Inject } from '@nestjs/common'
import { Interval, NestSchedule } from 'nest-schedule'
import { WebSocketServer, WebSocketGateway } from '@nestjs/websockets'
// Services
import { AmendService } from 'src/services'
import { Server } from 'socket.io'

@Injectable()
@WebSocketGateway()
export class CheckAmendVoteTask extends NestSchedule {
  constructor(
    @Inject('AmendService')
    private readonly amendService: AmendService
  ) {
    super()
  }

  @WebSocketServer()
  io: Server

  @Interval(5000)
  CheckAmendVoteTask() {
    this.amendService.checkAmendVotes(this.io)
  }
}
