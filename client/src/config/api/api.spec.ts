import { apiConfig } from './api'

test('config should defined some const', () => {
  expect(apiConfig.url).toBeDefined()
  expect(apiConfig.url.local).toBeDefined()
  expect(apiConfig.url.integration).toBeDefined()
  expect(apiConfig.url.production).toBeDefined()
})
