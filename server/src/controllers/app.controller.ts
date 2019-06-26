import { Controller, Get } from '@nestjs/common'
import { User, Text } from '../entities'
import config from '../config'

@Controller()
export class AppController {
  @Get('config')
  async getConfig() {
    try {
      const [users, texts] = await Promise.all([User.find(), Text.find()])

      return {
        name: config.instance.name,
        description: config.instance.description,
        language: config.instance.language,
        instanceUrl: config.instance.instanceUrl,
        private: config.instance.private,
        users: users.filter(user => user.activated).length,
        texts: texts.length
      }
    } catch (error) {
      return { error }
    }
  }
}
