import { Controller, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { createDiffieHellman } from 'crypto'
import { User, Text } from '../entities'
import config from '../config'
import { AuthService } from '../services'
import chalk from 'chalk'

@Controller()
export class AppController {
  constructor(private authservice: AuthService) {}

  @Post('config')
  async configHandler(@Req() request: Request) {
    try {
      const { prime, generator, secret } = request.body
      const diffieHellman = createDiffieHellman(prime, 'hex', generator, 'hex')
      const instanceSecret = diffieHellman.generateKeys('hex')

      console.log(chalk.cyan('Generate instance secret'))

      const sharedSecret = diffieHellman.computeSecret(secret, 'hex', 'hex')
      this.authservice.sharedSecret = sharedSecret

      console.log(chalk.cyan('Compute shared secret'))

      const [users, texts] = await Promise.all([User.find(), Text.find()])

      console.log(chalk.cyan('Send instance configuration'))

      return {
        name: config.instance.name,
        description: config.instance.description,
        language: config.instance.language,
        instanceUrl: config.instance.instanceUrl,
        private: config.instance.private,
        users: users.filter(user => user.activated).length,
        texts: texts.length,
        instanceSecret
      }
    } catch (error) {
      console.log(chalk.redBright(error))
    }
  }
}
