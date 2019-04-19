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
  AmendService,
  Auth,
  Crypto
} from './services'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Amend]),
    TypeOrmModule.forFeature([Text]),
    TypeOrmModule.forFeature([Event])
  ],
  providers: [
    ...databaseProvider,
    EventService,
    UserService,
    TextService,
    AmendService,
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
