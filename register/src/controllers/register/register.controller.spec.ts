import { Test, TestingModule } from '@nestjs/testing'
import { RegisterController } from './register.controller'

describe('AppController', () => {
  let controller: RegisterController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController]
    }).compile()

    controller = app.get(RegisterController)
  })

  describe('root', () => {
    it('should be truthy', () => {
      expect(controller).toBeTruthy()
    })
  })
})
