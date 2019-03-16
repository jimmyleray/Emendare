import { Module } from '@nestjs/common'
import { AppController } from '../../controllers'
import { HelloService } from '../../services'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [HelloService],
})
export class AppModule {}
