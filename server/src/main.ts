import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as compression from 'compression'
import * as bodyParser from 'body-parser'
import * as helmet from 'helmet'

// Chalk for colored logs
import chalk from 'chalk'

async function bootstrap() {
  // Initial server log
  console.log(chalk.green('> Emendare Server launch\n'))

  // Create NestJS application
  const app = await NestFactory.create(AppModule)

  // Security
  app.use(helmet())
  app.enableCors()

  // Body Parsing
  app.use(bodyParser.json()) // for parsing json
  app.use(bodyParser.urlencoded({ extended: true })) // for parsing x-www-form-urlencoded

  // Compression
  app.use(compression())

  // Start and listening on a specific port
  const port = Number(process.env.PORT) || 3030
  app.listen(port)
  console.log(chalk.green(`Emendare server listening on port ${port}`))
}

bootstrap()
