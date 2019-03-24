import { createConnection } from 'typeorm'

export const databaseProvider = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () =>
      await createConnection({
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        username: '',
        password: '',
        database: 'register',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        useNewUrlParser: true
      })
  }
]
