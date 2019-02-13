import { Password } from './password'

describe('isSamePassword', () => {
  test('should check if 2 password are the same', () => {
    expect(Password.isSamePassword('abcdefgh123', 'abcdefgh123')).toBe(true)
    expect(Password.isSamePassword('', '')).toBe(false)
    expect(Password.isSamePassword('1234azerty', '1243azerty')).toBe(false)
  })
})

describe('isLenghtPAsswordValid', () => {
  test('should check if the length of the password is higher that default length (8)', () => {
    expect(Password.isLengthPasswordValid('abcdefg')).toBe(false)
    expect(Password.isLengthPasswordValid('12345678')).toBe(true)
  })

  test('should check if the length is higher than 10', () => {
    expect(Password.isLengthPasswordValid('', 10)).toBe(false)
    expect(Password.isLengthPasswordValid('12345678910', 9)).toBe(true)
  })
})
