import { Controller, Get, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { Instance } from '../../entities'
import fetch from 'node-fetch'

@Controller()
export class RegisterController {
  @Get('getInstances')
  async findAll() {
    const instances = await Instance.find()
    return instances.filter(instance => !instance.private)
  }

  @Post('registerInstance')
  async registerInstance(@Req() request: Request) {
    const { instanceUrl } = request.body

    if (instanceUrl) {
      const response = await fetch(instanceUrl + 'config')
      const config = await response.json()

      if (config) {
        let instance = await Instance.findOne({ instanceUrl })

        if (!instance) {
          instance = Instance.create()
        }

        Object.entries(config).forEach(([key, value]) => {
          instance[key] = value
        })

        return await instance.save()
      }
    }
  }
}
