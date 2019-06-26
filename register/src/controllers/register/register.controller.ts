import { Controller, Get, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { createDiffieHellman } from 'crypto'
import { Instance } from '../../entities'
import fetch from 'node-fetch'

@Controller()
export class RegisterController {
  @Get('getInstances')
  async getInstances() {
    const instances = await Instance.find()
    return instances.filter(instance => !instance.private)
  }

  @Post('sharedSecret')
  async sharedSecret(@Req() request: Request) {
    const { prime, generator, secret } = request.body
    if (prime && generator && secret) {
      const diffieHellman = createDiffieHellman(prime, 'hex', generator, 'hex')
      const registerSecret = diffieHellman.generateKeys('hex')
      const sharedSecret = diffieHellman.computeSecret(secret, 'hex', 'hex')
      return { registerSecret }
    }
  }

  @Post('registerInstance')
  async registerInstance(@Req() request: Request) {
    const { instanceUrl } = request.body

    if (instanceUrl) {
      const response = await fetch(instanceUrl + 'config')
      const config = await response.json()

      if (config && !config.error) {
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
