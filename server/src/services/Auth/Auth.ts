import njwt from 'njwt'
import { sign, verify, decode } from 'jsonwebtoken'
import config from '../../config'
import { IJWT } from '../../../../interfaces'
import { Injectable } from '@nestjs/common'

@Injectable()
export class Auth {
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
    return !!this.decodeToken(token)
  }
}
