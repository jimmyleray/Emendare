import { CacheModule, Module } from '@nestjs/common'
import { RegisterController } from './controllers'
import { databaseProvider } from './providers'

@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // number of seconds in cache
      max: 10 // maximum number of items in cache
    })
  ],
  controllers: [RegisterController],
  providers: [...databaseProvider]
})
export class AppModule {}
