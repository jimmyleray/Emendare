import { Module } from '@nestjs/common'
import { ApplicationController } from './controllers'
import { registerProvider, databaseProvider } from './providers'
import { HelloService, RegisterService } from './services'

@Module({
  imports: [],
  controllers: [ApplicationController],
  providers: [
    HelloService,
    RegisterService,
    ...databaseProvider,
    ...registerProvider
  ]
})
export class AppModule {}
