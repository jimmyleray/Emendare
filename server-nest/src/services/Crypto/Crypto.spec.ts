import { Crypto } from './Crypto'

let crypto: Crypto
beforeEach(() => {
  crypto = new Crypto()
})

test('returned token is a string', () => {
  expect(typeof crypto.getToken()).toBe('string')
})

test('returned different tokens', () => {
  expect(crypto.getToken()).not.toBe(crypto.getToken())
})
