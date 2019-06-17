import { randomBytes } from 'crypto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CryptoService {
  public getToken(size = 32) {
    const buffer = randomBytes(size)
    return buffer.toString('hex')
  }
}
