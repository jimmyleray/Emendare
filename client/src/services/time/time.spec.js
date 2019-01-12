import { Time } from './time'

describe('convertMsToTime', () => {
  test('should convert ms to seconds', () => {
    expect(Time.convertMsToTime(1000)).toEqual({ sec: 1, min: 0, hrs: 0 })
    expect(Time.convertMsToTime(500)).toEqual({ sec: 0, min: 0, hrs: 0 })
    expect(Time.convertMsToTime(2500)).toEqual({ sec: 2, min: 0, hrs: 0 })
  })

  test('should convert ms to minutes and seconds', () => {
    expect(Time.convertMsToTime(60 * 1000)).toEqual({ sec: 0, min: 1, hrs: 0 })
    expect(Time.convertMsToTime(60 * 1000 + 1000)).toEqual({
      sec: 1,
      min: 1,
      hrs: 0
    })
  })

  test('should convert ms to hours, minutes and seconds', () => {
    expect(Time.convertMsToTime(60 * 60 * 1000)).toEqual({
      sec: 0,
      min: 0,
      hrs: 1
    })
    expect(Time.convertMsToTime(60 * 60 * 1000 + 60 * 1000)).toEqual({
      sec: 0,
      min: 1,
      hrs: 1
    })
    expect(Time.convertMsToTime(60 * 60 * 1000 + 60 * 1000 + 2000)).toEqual({
      sec: 2,
      min: 1,
      hrs: 1
    })
  })

  test('should convert negative ms too', () => {
    expect(Time.convertMsToTime(-60 * 60 * 1000)).toEqual({
      sec: 0,
      min: 0,
      hrs: -1
    })
    expect(Time.convertMsToTime(60 * 1000 - 60 * 60 * 1000)).toEqual({
      sec: 0,
      min: 1,
      hrs: -1
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
    const time = { sec: 2, min: 1, hrs: 1 }
    expect(Time.toTimeString(time)).toBe('1 heures et 1 minutes')

    const timeBis = { sec: 53, min: 0, hrs: 0 }
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
    const time = { sec: 0, min: 0, hrs: 0 }
    expect(Time.isNegative(time)).toBe(true)

    const timeBis = { sec: -5, min: -2, hrs: 0 }
    expect(Time.isNegative(timeBis)).toBe(true)
  })

  test('should return false if time is positive', () => {
    const time = { sec: 0, min: 2, hrs: 1 }
    expect(Time.isNegative(time)).toBe(false)
  })
})
