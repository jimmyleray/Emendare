import { Controller, Get, Param, Body, Post } from '@nestjs/common'
import { Register } from '../../entities'

@Controller('registers')
export class RegisterController {
  @Get()
  async findAll() {
    return await Register.find()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await Register.findOne(id)
  }

  @Post()
  async create(@Body() body: Partial<Register>) {
    const register = new Register()
    Object.entries(body).forEach(([key, value]) => {
      register[key] = value
    })
    return await register.save()
  }
}
