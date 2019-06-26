import { Module } from '@nestjs/common'
import { databaseProvider } from './providers'
import { ScheduleModule } from 'nest-schedule'
import { CheckAmendVoteTask } from './tasks'
import { AppController } from './controllers'
import { GraphQLModule } from '@nestjs/graphql'

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
  AmendService,
  AuthService,
  CryptoService,
  MailService
} from './services'
import {
  AmendResolver,
  TextResolver,
  EventResolver,
  UserResolver
} from './resolvers'

const SERVICES = [
  EventService,
  UserService,
  TextService,
  AmendService,
  AuthService,
  CryptoService,
  MailService
]
const RESOLVERS = [AmendResolver, TextResolver, EventResolver, UserResolver]
const CONTROLLERS = [AppController]
const TASKS = [CheckAmendVoteTask]
const GATEWAYS = [EventGateway, AmendGateway, UserGateway, TextGateway]
const PROVIDERS = [...databaseProvider]

@Module({
  controllers: CONTROLLERS,
  providers: [...PROVIDERS, ...GATEWAYS, ...SERVICES, ...TASKS, ...RESOLVERS],
  imports: [
    ScheduleModule.register(),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      formatError(error) {
        return error
      }
    })
  ]
})
export class AppModule {}
