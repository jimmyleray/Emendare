import { AuthService } from './auth.service'

describe('AuthService', () => {
  let auth: AuthService
  beforeEach(() => {
    auth = new AuthService()
  })

  test('should not validate JWT token', () => {
    expect(auth.isTokenValid('abcd')).toBe(false)
  })

  test('returned JWT token is a string', () => {
    expect(typeof auth.createToken({ id: 'abcd' })).toBe('string')
  })

  test('returned JWT token is valid', () => {
    expect(auth.isTokenValid(auth.createToken({ id: 'abcd' }))).toBe(true)
  })

  test('returned JWT token is expired', () => {
    const token = auth.createToken({ id: 'abcd' }, 0)
    expect(auth.isTokenExpired(token)).toBe(true)
  })

  test('returned different JWT tokens', () => {
    expect(auth.createToken({ id: 'abcd' })).not.toBe(
      auth.createToken({ id: 'abcd' })
    )
  })

  test('can retreive info from token', () => {
    const data = { id: 'abcd', test: 'test' }
    const token = auth.createToken(data)
    const jwtData = auth.decodeToken(token)
    expect(jwtData).toMatchObject(data)
  })
})
