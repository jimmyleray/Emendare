import { Time } from './time'

describe('convertMsToTime', () => {
  test('should convert ms to seconds', () => {
    expect(Time.convertMsToTime(1000)).toEqual({
      seconds: 1,
      minutes: 0,
      hours: 0,
      days: 0
    })
    expect(Time.convertMsToTime(500)).toEqual({
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0
    })
    expect(Time.convertMsToTime(2500)).toEqual({
      seconds: 2,
      minutes: 0,
      hours: 0,
      days: 0
    })
  })

  test('should convert ms to minutes and seconds', () => {
    expect(Time.convertMsToTime(60 * 1000)).toEqual({
      seconds: 0,
      minutes: 1,
      hours: 0,
      days: 0
    })
    expect(Time.convertMsToTime(60 * 1000 + 1000)).toEqual({
      seconds: 1,
      minutes: 1,
      hours: 0,
      days: 0
    })
  })

  test('should convert ms to hours, minutes and seconds', () => {
    expect(Time.convertMsToTime(60 * 60 * 1000)).toEqual({
      seconds: 0,
      minutes: 0,
      hours: 1,
      days: 0
    })
    expect(Time.convertMsToTime(60 * 60 * 1000 + 60 * 1000)).toEqual({
      seconds: 0,
      minutes: 1,
      hours: 1,
      days: 0
    })
    expect(Time.convertMsToTime(60 * 60 * 1000 + 60 * 1000 + 2000)).toEqual({
      seconds: 2,
      minutes: 1,
      hours: 1,
      days: 0
    })
  })

  test('should convert negative ms too', () => {
    expect(Time.convertMsToTime(-60 * 60 * 1000)).toEqual({
      seconds: 0,
      minutes: 0,
      hours: 23,
      days: -1
    })
    expect(Time.convertMsToTime(60 * 1000 - 60 * 60 * 1000)).toEqual({
      seconds: 0,
      minutes: 1,
      hours: 23,
      days: -1
    })
  })
})

describe('getTimeSpent', () => {
  test('should return 0ms spent between now and now', () => {
    const now = new Date()
    expect(Time.getTimeSpent(now, now)).toBe(0)
    expect(Time.getTimeSpent(now.toISOString(), now)).toBe(0)
  })
})

describe('getTimeLeft', () => {
  test('should return 0ms spent between now and now', () => {
    const now = new Date()
    expect(Time.getTimeLeft(now, now)).toBe(0)
    expect(Time.getTimeLeft(now.toISOString(), now)).toBe(0)
  })
})

describe('toTimeString', () => {
  test('should return a formatted date string', () => {
    const time1 = { seconds: 2, minutes: 1, hours: 1, days: 0 }
    expect(Time.toTimeString(time1)).toBe('1 h')

    const time2 = { seconds: 2, minutes: 1, hours: 1, days: 2 }
    expect(Time.toTimeString(time2)).toBe('2 j')

    const time3 = { seconds: 53, minutes: 0, hours: 0, days: 0 }
    expect(Time.toTimeString(time3)).toBe('53 sec')

    const time4 = { seconds: 53, minutes: 25, hours: 0, days: 0 }
    expect(Time.toTimeString(time4)).toBe('25 min')

    const time5 = { seconds: 0, minutes: 0, hours: 0, days: 0 }
    expect(Time.toTimeString(time5)).toBe('0 sec')
  })
})

describe('addTimeToDate', () => {
  test('should return a formatted date string', () => {
    const now = new Date()
    const addedTime = 1000
    expect(Time.addTimeToDate(now, addedTime).getTime()).toBe(
      now.getTime() + addedTime
    )
    expect(Time.addTimeToDate(now.toISOString(), addedTime).getTime()).toBe(
      now.getTime() + addedTime
    )
  })
})

describe('isNegative', () => {
  test('should return true if time is negative or zero', () => {
    const time = { seconds: 0, minutes: 0, hours: 0, days: 0 }
    expect(Time.isNegative(time)).toBe(true)

    const timeBis = { seconds: -5, minutes: -2, hours: 0, days: 0 }
    expect(Time.isNegative(timeBis)).toBe(true)

    const timeTer = { seconds: 5, minutes: 2, hours: 0, days: -1 }
    expect(Time.isNegative(timeTer)).toBe(true)
  })

  test('should return false if time is positive', () => {
    const time = { seconds: 0, minutes: 2, hours: 1, days: 0 }
    expect(Time.isNegative(time)).toBe(false)
  })
})

// describe('toDateString', () => {
//   test('should return the date in French or English', () => {
//     const date = '2019-04-26T07:03:27.972Z'
//     expect(Time.toDateString(date, 'FR')).toBe('26 avril')
//     expect(Time.toDateString(date, 'EN')).toBe('April 26')
//   })
//   test('should return the date in a year', () => {
//     const date = '2018-04-26T07:03:27.972Z'
//     expect(Time.toDateString(date, 'FR')).toBe('26 avril 2018')
//     expect(Time.toDateString(date, 'EN')).toBe('April 26, 2018')
//   })
// })
