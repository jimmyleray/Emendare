import crypto from 'crypto'

export class Crypto {
  public static getToken(size = 64) {
    const buffer = crypto.randomBytes(size)
    return buffer.toString('hex')
  }
}
