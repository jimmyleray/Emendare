import { createConnection } from 'typeorm'

export const databaseProvider = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () =>
      await createConnection({
        type: 'mongodb',
        host: process.env.MONGODB_ADDON_HOST || 'localhost',
        port: Number(process.env.MONGODB_ADDON_PORT) || 27017,
        username: process.env.MONGODB_ADDON_USER || '',
        password: process.env.MONGODB_ADDON_PASSWORD || '',
        database: process.env.MONGODB_ADDON_DB || 'register',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        useNewUrlParser: true
      })
  }
]
