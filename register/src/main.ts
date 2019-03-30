import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import config from './config'

NestFactory.create(AppModule).then(app => {
  app.listen(config.port)
})
