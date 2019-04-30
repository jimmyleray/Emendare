import { Module } from '@nestjs/common'
import { databaseProvider } from './providers'
import { TypeOrmModule } from '@nestjs/typeorm'
// Gateway
import {
  EventGateway,
  AmendGateway,
  UserGateway,
  TextGateway
} from './gateways'
// Entities
import { User, Amend, Text, Event } from './entities'

// services
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
    TextGateway,
    EventService,
    UserService,
    TextService,
    AmendService
  ]
})
export class AppModule {}
