export class UiEffectInput {
  /**
   * Set the color on the input according to the validity of it
   * @param isValid true if the input value is valid
   * @param inputValue the value of the input
   * @param customCssColor user can pass some custom css color
   */
  public static setColor(
    isValid: boolean,
    inputValue: any,
    customCssColor?: { true: string; false: string }
  ) {
    if (inputValue || inputValue === 0) {
      if (isValid) {
        if (customCssColor && customCssColor.true) {
          return 'input ' + customCssColor.true
        } else {
          return 'input is-success'
        }
      } else {
        if (customCssColor && customCssColor.false) {
          return 'input ' + customCssColor.false
        } else {
          return 'input is-danger'
        }
      }
    }
    return 'input'
  }
}
