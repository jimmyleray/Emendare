import { Module } from '@nestjs/common'
import { RegisterController } from './controllers'
import { databaseProvider } from './providers'

@Module({
  controllers: [RegisterController],
  providers: [...databaseProvider]
})
export class AppModule {}
