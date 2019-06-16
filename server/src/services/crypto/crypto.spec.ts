import { CryptoService } from './crypto.service'

let crypto: CryptoService
beforeEach(() => {
  crypto = new CryptoService()
})

test('returned token is a string', () => {
  expect(typeof crypto.getToken()).toBe('string')
})

test('returned different tokens', () => {
  expect(crypto.getToken()).not.toBe(crypto.getToken())
})
