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
    const register = (await Register.findOne({ url })) || new Register()
    Object.entries(data).forEach(([key, value]) => {
      register[key] = value
    })

    return await register.save()
  }
}
