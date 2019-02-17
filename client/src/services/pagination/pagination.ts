import { range, inRange, pullAll } from 'lodash'

/**
 * This service will help to manage Pagination
 */
export class Pagination {
  public static getRange = (
    min: number,
    max: number,
    value: number
  ): Array<number | '&'> => {
    if (min > max) {
      return []
    } else if (!inRange(value, min, max + 1)) {
      return []
    } else {
      let res: Array<number | '&'> = range(min, max + 1)
      if (value > min + 3) {
        res = pullAll(res, range(min + 1, value - 2))
        res[res.indexOf(value - 2)] = '&'
      }
      if (value < max - 3) {
        res = pullAll(res, range(value + 3, max))
        res[res.indexOf(value + 2)] = '&'
      }
      return res
    }
  }
}
