import { apiConfig } from './api'

test('config should defined some const', () => {
  expect(apiConfig.url).toBeDefined()
  expect(apiConfig.url.test).toBeDefined()
  expect(apiConfig.url.development).toBeDefined()
  expect(apiConfig.url.production).toBeDefined()
})
