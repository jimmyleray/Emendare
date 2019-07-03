export class AuthService {
  /**
   * Return the value of the token stored in the local storage
   */
  public static getToken = (): string | null =>
    window.localStorage.getItem('token')

  /**
   * Set the value of the token in the local storage
   * @param token value of the token
   */
  public static setToken = (token: string): void =>
    window.localStorage.setItem('token', token)

  /**
   * Remove the value of the token inside the local storage
   */
  public static removeToken = (): void =>
    window.localStorage.removeItem('token')

  /** Logout the user */
  public static logout = () => {
    AuthService.removeToken()
    Promise.resolve(true)
  }
}
