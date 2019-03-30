import { Test, TestingModule } from '@nestjs/testing'
import { RegisterController } from './register.controller'
import { HelloService } from '../../services'

describe('AppController', () => {
  let controller: RegisterController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [HelloService]
    }).compile()

    controller = app.get(RegisterController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(controller.getHello()).toBe('Hello World!')
    })
  })
})
