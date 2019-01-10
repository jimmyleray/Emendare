import crypto from 'crypto'

export class Crypto {
  public static getToken() {
    const buffer = crypto.randomBytes(256)
    return buffer.toString('hex')
  }
}
