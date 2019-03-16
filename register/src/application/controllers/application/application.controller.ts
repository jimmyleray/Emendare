import { Controller, Get } from '@nestjs/common'
import { HelloService } from '../../providers'

@Controller()
export class ApplicationController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHello(): string {
    return this.helloService.getHello()
  }
}
