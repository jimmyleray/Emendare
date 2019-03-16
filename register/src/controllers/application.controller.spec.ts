import { Test, TestingModule } from '@nestjs/testing'
import { ApplicationController } from './application.controller'
import { HelloService } from '../services'

describe('AppController', () => {
  let appController: ApplicationController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationController],
      providers: [HelloService]
    }).compile()

    appController = app.get<ApplicationController>(ApplicationController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!')
    })
  })
})
