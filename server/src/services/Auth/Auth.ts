import njwt from 'njwt'
import config from '../../config'
import { IJWT } from '../../../../interfaces'

export class Auth {
  public static createToken(claims = {}, expire = config.jwt.expire): string {
    const jwt = njwt.create(claims, config.jwt.secret)
    jwt.setExpiration(Date.now() + expire)
    return jwt.compact()
  }

  public static decodeToken(token: string): IJWT {
    try {
      return njwt.verify(token, config.jwt.secret).body
    } catch (err) {
      return null
    }
  }

  public static isTokenExpired(token: string): boolean {
    const decoded = Auth.decodeToken(token);
    if (!decoded) {
      return true
    }
    return Math.floor(Date.now() / 1000) >= decoded.exp
  }

  public static isTokenValid(token: string): boolean {
    return !!Auth.decodeToken(token);
  }
}
