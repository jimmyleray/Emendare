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
@UseInterceptors(CacheInterceptor)
export class RegisterController {
  @Get()
  async findAll() {
    const registers = await Register.find()
    return registers.filter(register => !!register.url && register.url !== '/')
  }

  @Post()
  async create(@Req() request: Request) {
    console.log(request)
    const url = request.get('referer')
    const register = (await Register.findOne({ url })) || Register.create()
    Object.entries(request.body).forEach(([key, value]) => {
      register[key] = value
    })
    register.url = url
    console.log(register)
    return await register.save()
  }
}
