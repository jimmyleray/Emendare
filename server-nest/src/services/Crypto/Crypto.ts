import { randomBytes } from 'crypto'

export class Crypto {
  public static getToken(size = 32) {
    const buffer = randomBytes(size)
    return buffer.toString('hex')
  }
}
