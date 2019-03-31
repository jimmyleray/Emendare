import {
  Controller,
  Get,
  Body,
  Post,
  Req,
  UseInterceptors,
  CacheInterceptor,
  NotAcceptableException
} from '@nestjs/common'
import { Request } from 'express'
import { Register } from '../../entities'
import fetch from 'node-fetch'

@Controller()
@UseInterceptors(CacheInterceptor)
export class RegisterController {
  @Get()
  async findAll() {
    const registers = await Register.find()
    return registers.filter(register => !!register.url)
  }

  @Post()
  async create(@Req() request: Request) {
    const url = request.originalUrl
    const res = await fetch(url + '/config')
    if (res) {
      const register = (await Register.findOne({ url })) || new Register()
      register.url = url

      const config: Partial<Register> = await res.json()
      Object.entries(config).forEach(([key, value]) => {
        register[key] = value
      })

      return await register.save()
    } else {
      throw new NotAcceptableException()
    }
  }
}
