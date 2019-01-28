/**
 * This service will add some utils functions
 */
export class Utils {
  public static delay = (ms: number) => {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }
}
