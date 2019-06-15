import { createConnection, ConnectionOptions } from 'typeorm'

const databaseConfig: ConnectionOptions = {
  type: 'mongodb',
  synchronize: true,
  useNewUrlParser: true,
  host: process.env.MONGODB_ADDON_HOST || 'localhost',
  port: Number(process.env.MONGODB_ADDON_PORT) || 27017,
  username: process.env.MONGODB_ADDON_USER || '',
  password: process.env.MONGODB_ADDON_PASSWORD || '',
  database: process.env.MONGODB_ADDON_DB || 'emendare',
  entities: [__dirname + '/../entities/**/*.entity{.ts,.js}']
}

export const databaseProvider = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => await createConnection(databaseConfig)
  }
]
