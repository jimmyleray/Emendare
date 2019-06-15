import { sign, verify } from 'jsonwebtoken'
import { IJWT } from '../../../../interfaces'
import { Injectable } from '@nestjs/common'
import config from '../../config'

@Injectable()
export class AuthService {
  public createToken(claims = {}, expire = config.jwt.expire): string {
    const token = sign(
      { ...claims, exp: Math.floor(Date.now() / 1000) + expire },
      config.jwt.secret
    )

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
