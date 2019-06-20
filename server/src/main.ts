import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as compression from 'compression'
import * as bodyParser from 'body-parser'
import { registerInstance } from './tasks'
import * as helmet from 'helmet'
import config from './config'

// Chalk for colored logs
import chalk from 'chalk'

async function bootstrap() {
  // Initial server log
  console.log(chalk.green('> Emendare Server launch\n'))

  // Create NestJS application
  const app = await NestFactory.create(AppModule)

  // Security
  app.use(helmet())
  app.enableCors({ origin: config.clientUrl })

  // Body Parsing
  app.use(bodyParser.json()) // for parsing json
  app.use(bodyParser.urlencoded({ extended: true })) // for parsing x-www-form-urlencoded

  // Compression
  app.use(compression())

  // Start and listening
  app.listen(config.port)
  console.log(chalk.green(`Emendare server listening on port ${config.port}`))

  // Call for register this instance
  registerInstance()
}

bootstrap()
