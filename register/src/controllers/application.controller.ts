import { Controller, Get } from '@nestjs/common'
import { HelloService } from '../services'

@Controller()
export class ApplicationController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHello(): string {
    return this.helloService.getHello()
  }
}
