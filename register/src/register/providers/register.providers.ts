import { Connection } from 'typeorm'
import { Register } from '../entities'

export const registerProviders = [
  {
    provide: 'RegisterRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Register),
    inject: ['DbConnectionToken'],
  },
]
