import { User } from '../../entities'

export function withAuthentication(
  target: object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  // save a reference to the original method
  const originalMethod = descriptor.value

  // NOTE: Do not use arrow syntax here
  descriptor.value = async function(...args: any[]) {
    const argIndex = args[0] ? 0 : 1
    const { token } = args[argIndex]

    if (!this.authService) {
      console.error('Need to inject AuthService to use this decorator')
      return {
        error: { code: 500, message: 'Servor error' }
      }
    }

    if (!token || !this.authService.isTokenValid(token)) {
      return {
        error: { code: 401, message: 'Invalid token' }
      }
    }

    if (this.authService.isTokenExpired(token)) {
      return {
        error: { code: 401, message: 'Expired token' }
      }
    }

    const { id } = this.authService.decodeToken(token)
    const user: User = await User.findOne(id)

    if (!user) {
      return {
        error: { code: 401, message: 'Unknow user' }
      }
    }

    if (!user.activated) {
      return {
        error: { code: 401, message: 'Unactive user' }
      }
    }

    // add user reference in message data
    if (args[argIndex]) {
      args[argIndex].data
        ? (args[argIndex].data.user = user)
        : (args[argIndex].user = user)
    }

    // return the result of the original method
    const response = await originalMethod.apply(this, args)
    return response
  }

  return descriptor
}
