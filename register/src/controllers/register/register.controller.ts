import {
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
  CacheInterceptor
} from '@nestjs/common'
import { Request } from 'express'
import { Register } from '../../entities'

@Controller()
export class RegisterController {
  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    const registers = await Register.find()
    return registers.filter(register => !!register.url && register.url !== '/')
  }

  @Post()
  async create(@Req() request: Request) {
    const url = request.hostname
    const register = (await Register.findOne({ url })) || Register.create()
    Object.entries(request.body).forEach(([key, value]) => {
      register[key] = value
    })
    register.url = url
    console.log(register)
    return await register.save()
  }
}
