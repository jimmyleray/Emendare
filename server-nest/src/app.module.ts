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

// services
import {
  EventService,
  UserService,
  TextService,
  AmendService,
  Auth,
  Crypto
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
    AmendService,
    Auth,
    Crypto
  ]
})
export class AppModule {}
