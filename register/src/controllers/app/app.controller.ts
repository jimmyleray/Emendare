import { Controller, Get } from '@nestjs/common'
import { HelloService } from '../../services/hello'

@Controller()
export class AppController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHello(): string {
    return this.helloService.getHello()
  }
}
