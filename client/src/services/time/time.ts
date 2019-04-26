import { ITime } from '../../../../interfaces'
import { isString } from 'lodash'

/**
 * This service will help to manage Time
 */
export class Time {
  /**
   * Retrieve the value of sec, min and hrs of a timestamp
   * @param {number} milliSeconds
   */
  public static convertMsToTime = (milliSeconds: number): ITime => {
    let seconds = Math.floor(milliSeconds / 1000)
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds - days * 86400) / 3600)
    const minutes = Math.floor((seconds - days * 86400 - hours * 3600) / 60)

    // Re-calculate seconds
    seconds = seconds - (minutes * 60 + hours * 3600 + days * 86400)
    return { seconds, minutes, hours, days }
  }

  /**
   * Calculate the time spent between now and a date
   * @param {string || Date} date
   */
  public static getTimeSpent = (date: string | Date, from = new Date()) => {
    if (isString(date)) {
      date = new Date(date)
    }
    return Math.floor(from.getTime() - date.getTime())
  }

  /**
   * Calculate the time left between now and a date
   * @param {string || Date} date
   * @param {number} delay
   */
  public static getTimeLeft = (date: string | Date, from = new Date()) => {
    if (isString(date)) {
      date = new Date(date)
    }
    return Math.floor(date.getTime() - from.getTime())
  }

  /**
   * Convert an object of time (sec, min, hrs) to an adaptable string
   * @param {ITime} time
   * @param {string} defaultView
   */
  public static toTimeString = (time: ITime) => {
    if (time.days > 0) {
      return `${time.days} j`
    } else if (time.hours > 0) {
      return `${time.hours} h`
    } else if (time.minutes > 0) {
      return `${time.minutes} min`
    } else if (time.seconds > 0) {
      return `${time.seconds} sec`
    } else {
      return '0 sec'
    }
  }

  public static toDateString = (data: Date | string, language: string) => {
    const months: any = [
      { FR: 'Janvier', EN: 'January' },
      { FR: 'Février', EN: 'February' },
      { FR: 'Mars', EN: 'March' },
      { FR: 'Avril', EN: 'April' },
      { FR: 'Mai', EN: 'May' },
      { FR: 'Juin', EN: 'June' },
      { FR: 'Juillet', EN: 'July' },
      { FR: 'Août', EN: 'August' },
      { FR: 'Septembre', EN: 'September' },
      { FR: 'Octobre', EN: 'October' },
      { FR: 'Novembre', EN: 'November' },
      { FR: 'Décembre', EN: 'December' }
    ]
    const date = new Date(data)
    console.log(data)
    const day = date
      .toLocaleString()
      .split(',')[0]
      .split('/')[1]
    const month = months[date.getMonth()][language]
    const year = date.getFullYear()

    return `${day} ${month}${
      year !== new Date(Date.now()).getFullYear() ? ` ${year}` : ''
    }`
  }

  /**
   * Add time to a Date
   * @param {Date || string} date
   * @param {number} time
   */
  public static addTimeToDate = (date: string | Date, time: number) => {
    if (isString(date)) {
      date = new Date(date)
    }
    return new Date(date.getTime() + time)
  }

  /**
   * Return true if the time is equal or less to 0 else false
   * @param {ITime} time
   */
  public static isNegative = (time: ITime) =>
    time.seconds < 0 ||
    time.minutes < 0 ||
    time.hours < 0 ||
    time.days < 0 ||
    (time.seconds === 0 &&
      time.minutes === 0 &&
      time.hours === 0 &&
      time.days === 0)
}
