import { sign, verify } from 'jsonwebtoken'
import { IJWT } from '../../../../interfaces'
import { Injectable } from '@nestjs/common'
import { createDiffieHellman } from 'crypto'
import fetch from 'node-fetch'
import config from '../../config'

@Injectable()
export class AuthService {
  private sharedSecret: string
  private secret: string

  constructor() {
    const diffieHellman = createDiffieHellman(256)
    this.secret = diffieHellman.generateKeys('hex')

    fetch(config.registerUrl + 'sharedSecret', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prime: diffieHellman.getPrime('hex'),
        generator: diffieHellman.getGenerator('hex'),
        secret: this.secret
      })
    })
      .then(response => response.json())
      .then(data => {
        const { registerSecret } = data

        if (registerSecret) {
          this.sharedSecret = diffieHellman.computeSecret(
            registerSecret,
            'hex',
            'hex'
          )
        }
      })
      .catch(console.error)
  }

  public createToken(claims = {}, expiresIn = config.jwt.expire): string {
    const token = sign(claims, config.jwt.secret, { expiresIn })
    return token.toString()
  }

  public decodeToken(token: string): IJWT {
    try {
      return verify(token, config.jwt.secret)
    } catch (err) {
      return null
    }
  }

  public isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token)

    if (!decoded) {
      return true
    }

    return Math.floor(Date.now() / 1000) >= decoded.exp
  }

  public isTokenValid(token: string): boolean {
    return Boolean(this.decodeToken(token))
  }
}
