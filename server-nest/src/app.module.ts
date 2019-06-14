import { Module } from '@nestjs/common'
import { databaseProvider } from './providers'
import { ScheduleModule } from 'nest-schedule'

// Gateway
import {
  EventGateway,
  AmendGateway,
  UserGateway,
  TextGateway
} from './gateways'

// services
import {
  EventService,
  UserService,
  TextService,
  AmendService,
  Auth,
  Crypto
} from './services'
import { CheckAmendVoteTask } from './tasks'

@Module({
  providers: [
    ...databaseProvider,
    EventGateway,
    AmendGateway,
    UserGateway,
    TextGateway,
    EventService,
    UserService,
    TextService,
    AmendService,
    Auth,
    Crypto,
    CheckAmendVoteTask
  ],
  imports: [ScheduleModule.register()]
})
export class AppModule {}
