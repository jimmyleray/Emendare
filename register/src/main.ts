import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as rateLimit from 'express-rate-limit'
import * as compression from 'compression'
import * as bodyParser from 'body-parser'
import * as helmet from 'helmet'

NestFactory.create(AppModule).then(app => {
  // Rate Limit
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    })
  )

  // Security
  app.use(helmet())
  app.enableCors()

  // Body Parsing
  app.use(bodyParser.json()) // for parsing json
  app.use(bodyParser.urlencoded({ extended: true })) // for parsing x-www-form-urlencoded

  // Compression
  app.use(compression())

  // Start and listening on a specific port
  const port = Number(process.env.PORT) || 3003
  app.listen(port)
})
