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

  @Post('registerInstance')
  async registerInstance(@Req() request: Request) {
    const { instanceUrl } = request.body

    if (instanceUrl) {
      const diffieHellman = createDiffieHellman(256)
      const secret = diffieHellman.generateKeys('hex')

      const response = await fetch(instanceUrl + 'config', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prime: diffieHellman.getPrime('hex'),
          generator: diffieHellman.getGenerator('hex'),
          secret
        })
      })

      const config = await response.json()

      if (config.instanceSecret) {
        config.sharedSecret = diffieHellman.computeSecret(
          config.instanceSecret,
          'hex',
          'hex'
        )
        delete config.instanceSecret
      }

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
