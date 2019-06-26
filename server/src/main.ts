import { NestFactory } from '@nestjs/core'
import compression from 'compression'
import * as bodyParser from 'body-parser'
import helmet from 'helmet'
import chalk from 'chalk'

import { AppModule } from './app.module'
import { registerInstance } from './tasks'
import config from './config'

async function bootstrap() {
  try {
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
  } catch (error) {
    console.log(chalk.redBright(error))
  }
}

bootstrap()
