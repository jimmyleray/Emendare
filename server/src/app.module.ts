import { Module } from '@nestjs/common'
import { databaseProvider } from './providers'
import { ScheduleModule } from 'nest-schedule'
import { CheckAmendVoteTask } from './tasks'

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

const SERVICES = [
  EventService,
  UserService,
  TextService,
  AmendService,
  AuthService,
  CryptoService,
  MailService
]

const TASKS = [CheckAmendVoteTask]
const GATEWAYS = [EventGateway, AmendGateway, UserGateway, TextGateway]
const PROVIDERS = [...databaseProvider]

@Module({
  providers: [...PROVIDERS, ...GATEWAYS, ...SERVICES, ...TASKS],
  imports: [ScheduleModule.register()]
})
export class AppModule {}
