import { Crypto } from './Crypto'

test('returned token is a string', () => {
  expect(typeof Crypto.getToken()).toBe('string')
})

test('returned different tokens', () => {
  expect(Crypto.getToken()).not.toBe(Crypto.getToken())
})
