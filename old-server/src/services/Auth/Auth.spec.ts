import { Auth } from './Auth'

test('should not validate JWT token', () => {
  expect(Auth.isTokenValid('abcd')).toBe(false)
})

test('returned JWT token is a string', () => {
  expect(typeof Auth.createToken({ id: 'abcd' })).toBe('string')
})

test('returned JWT token is valid', () => {
  expect(Auth.isTokenValid(Auth.createToken({ id: 'abcd' }))).toBe(true)
})

test('returned JWT token is expired', () => {
  const token = Auth.createToken({ id: 'abcd' }, 0)
  expect(Auth.isTokenExpired(token)).toBe(true)
})

test('returned different JWT tokens', () => {
  expect(Auth.createToken({ id: 'abcd' })).not.toBe(Auth.createToken({ id: 'abcd' }))
})

test('can retreive info from token', () => {
  const data = { id: 'abcd', test: 'test' }
  const token = Auth.createToken(data);
  const jwtData = Auth.decodeToken(token)
  expect(jwtData).toMatchObject(data)
})
