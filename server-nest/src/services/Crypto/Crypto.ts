import { randomBytes } from 'crypto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class Crypto {
  public getToken(size = 32) {
    const buffer = randomBytes(size)
    return buffer.toString('hex')
  }

  public objectId(timestamp: number) {
    return (
      timestamp.toString(16) +
      'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
        ((Math.random() * 16) | 0).toString(16)
      )
    )
  }
}
