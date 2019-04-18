import { Module } from '@nestjs/common'
import { databaseProvider } from './providers'
import {
  EventGateway,
  AmendGateway,
  UserGateway,
  TextGateway
} from './gateways'

import {
  EventService,
  UserService,
  TextService,
  AmendService
} from './services'

@Module({
  providers: [
    ...databaseProvider,
    EventGateway,
    AmendGateway,
    UserGateway,
    TextGateway
  ]
})
export class AppModule {}
