/**
 * This service will help to manage Time
 */
export class Time {
  /**
   * Retrieve the value of sec, min and hrs of a timestamp
   * @param {number} ms
   */
  static convertMsToTime = ms => {
    let sec = Math.floor(ms / 1000)
    const hrs = Math.floor(sec / 3600)
    const min = Math.floor((sec - hrs * 3600) / 60)

    // Re-calculate seconds
    sec = sec - (min * 60 + hrs * 3600)
    return { sec: sec, min: min, hrs: hrs }
  }

  /**
   * Calculate the time spent between now and a date
   * @param {string || Date} date
   */
  static getTimeSpent = date => {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    return Math.floor(new Date().getTime() - date.getTime())
  }

  /**
   * Calculate the time left between now and a date
   * @param {string || Date} date
   * @param {number} delay
   */
  static getTimeLeft = date => {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    return -Math.floor(new Date().getTime() - date.getTime())
  }

  /**
   * Convert an object of time (sec, min, hrs) to an adaptable string
   * @param {{sec:number, min:number, hrs: number}} time
   * @param {string} defaultView
   */
  static toTimeString = time => {
    return time.hrs === 0 && time.min === 0
      ? `${time.sec} secondes`
      : `${time.hrs} heures et ${time.min} minutes`
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
   * Return true if the time is equal to 0 else false
   * @param {{sec:number, min: number, hrs: number}} time
   */
  static isTimeZeros = time =>
    time.sec === 0 && time.min === 0 && time.hrs === 0
}
