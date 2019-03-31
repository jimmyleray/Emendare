import {
  Controller,
  Get,
  Body,
  Post,
  Req,
  UseInterceptors,
  CacheInterceptor,
  ForbiddenException
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
  async create(@Req() request: Request, @Body('url') url: string) {
    if (request.originalUrl === url) {
      const register = (await Register.findOne({ url })) || new Register()
      register.url = url
      return await register.save()
    } else {
      throw new ForbiddenException()
    }
  }
}
