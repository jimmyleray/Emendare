import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database'
import { registerProviders, RegisterService } from './providers'

@Module({
  imports: [DatabaseModule],
  providers: [...registerProviders, RegisterService],
})
export class RegisterModule {}
