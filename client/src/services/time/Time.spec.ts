import { Time } from './Time'

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
  })
})

describe('getTimeLeft', () => {
  test('should return 0ms spent between now and now', () => {
    const now = new Date()
    expect(Time.getTimeLeft(now, now)).toBe(0)
  })
})

describe('toTimeString', () => {
  test('should return a formatted date string', () => {
    const time = { seconds: 2, minutes: 1, hours: 1, days: 0 }
    expect(Time.toTimeString(time)).toBe('1 heure')

    const timeBis = { seconds: 53, minutes: 0, hours: 0, days: 0 }
    expect(Time.toTimeString(timeBis)).toBe('53 secondes')
  })
})

describe('addTimeToDate', () => {
  test('should return a formatted date string', () => {
    const now = new Date()
    const addedTime = 1000
    expect(Time.addTimeToDate(now, addedTime).getTime()).toBe(
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
