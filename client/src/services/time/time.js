/**
 * This service will help to manage Time
 */
export class Time {
  /**
   * Retrieve the value of sec, min and hrs of a timestamp
   * @param {number} ms
   */
  static convertMsToTime = milliSeconds => {
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
  static getTimeSpent = (date, from = new Date()) => {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    return Math.floor(from.getTime() - date.getTime())
  }

  /**
   * Calculate the time left between now and a date
   * @param {string || Date} date
   * @param {number} delay
   */
  static getTimeLeft = (date, from = new Date()) => {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    return Math.floor(date.getTime() - from.getTime())
  }

  /**
   * Convert an object of time (sec, min, hrs) to an adaptable string
   * @param {{sec:number, min:number, hrs: number}} time
   * @param {string} defaultView
   */
  static toTimeString = time => {
    if (time.days > 0) {
      return `${time.days} jour${time.days > 1 ? 's' : ''}`
    } else if (time.hours > 0) {
      return `${time.hours} heure${time.hours > 1 ? 's' : ''}`
    } else if (time.minutes > 0) {
      return `${time.minutes} minute${time.minutes > 1 ? 's' : ''}`
    } else if (time.seconds > 0) {
      return `${time.seconds} seconde${time.seconds > 1 ? 's' : ''}`
    }
  }

  /**
   * Add time to a Date
   * @param {Date || string} date
   * @param {number} time
   */
  static addTimeToDate = (date, time) => {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    return new Date(date.getTime() + time)
  }

  /**
   * Return true if the time is equal or less to 0 else false
   * @param {{sec:number, min: number, hrs: number}} time
   */
  static isNegative = time =>
    time.seconds < 0 ||
    time.minutes < 0 ||
    time.hours < 0 ||
    time.days < 0 ||
    (time.seconds === 0 &&
      time.minutes === 0 &&
      time.hours === 0 &&
      time.days === 0)
}
