import {
  Controller,
  Get,
  Body,
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
    return registers.filter(register => !!register.url)
  }

  @Post()
  async create(@Req() request: Request, @Body() data: Partial<Register>) {
    const url = request.originalUrl
    const register = (await Register.findOne({ url })) || Register.create()
    Object.entries(data).forEach(([key, value]) => {
      register[key] = value
    })
    console.log(data, register)

    return await register.save()
  }
}
