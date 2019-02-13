/**
 * Service to check the validity of a password
 */
export class Password {
  /**
   * Return true if password1 is equal to password2
   * @param password1
   * @param password2
   */
  public static isSamePassword(password1: string, password2: string) {
    if (!password1 || !password2) {
      return false
    } else {
      return password1 === password2
    }
  }

  /**
   * Return true if the password1 length is superior to the minimum length
   * @param password1
   * @param lenght minimum length
   */
  public static isLengthPasswordValid(password: string, length: number = 8) {
    if (!password) {
      return false
    } else {
      return password.length >= length
    }
  }
}
