import { Module } from '@nestjs/common'
import { RegisterController } from './controllers'
import { registerProvider, databaseProvider } from './providers'
import { HelloService, RegisterService } from './services'

@Module({
  imports: [],
  controllers: [RegisterController],
  providers: [
    HelloService,
    RegisterService,
    ...databaseProvider,
    ...registerProvider
  ]
})
export class AppModule {}
