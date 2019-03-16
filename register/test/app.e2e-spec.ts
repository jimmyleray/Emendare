import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { ApplicationModule } from '../src/application'

describe('AppController (e2e)', () => {
  let application

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile()

    application = moduleFixture.createNestApplication()
    await application.init()
  })

  it('/ (GET)', () => {
    return request(application.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })
})
