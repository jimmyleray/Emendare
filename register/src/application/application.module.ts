import { Module } from '@nestjs/common'
import { RegisterModule } from '../register/register.module'
import { ApplicationController } from './controllers'
import { HelloService } from './providers'

@Module({
  imports: [RegisterModule],
  controllers: [ApplicationController],
  providers: [HelloService],
})
export class ApplicationModule {}
