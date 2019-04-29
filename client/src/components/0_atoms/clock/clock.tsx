import React, { useState, useEffect, useContext } from 'react'
// Services
import { Time } from '../../../services'
// Interfaces
import { ITime } from '../../../../../interfaces'
// Components
import { I18nContext } from '../../../components'

interface IClockProps {
  date: Date | string
  className?: string
}

/**
 * HOC which update a time object {sec: number, min:number, hrs: number}
 * each second when the time is under 1 min else each minute
 *
 *  @param {function} getTime  provides a time object
 */
export const Clock = (getTime: any) => ({ date, ...rest }: IClockProps) => {
  const [clock, setClock] = useState(0)
  const [time, setTime] = useState(getTime(date))
  const { actualLanguage } = useContext(I18nContext)
  const start = (intervalDelay: number = 1000) => {
    const timeToDisplay: ITime = getTime(date)

    const second = 1000
    const minute = 60 * second
    const hour = 60 * minute
    const day = 24 * hour

    intervalDelay =
      timeToDisplay.days > 0
        ? day
        : timeToDisplay.hours > 0
        ? hour
        : timeToDisplay.minutes > 0
        ? minute
        : timeToDisplay.seconds > 0
        ? second
        : intervalDelay

    setClock(
      window.setInterval(() => {
        const time: ITime = getTime(date)
        if (Time.isNegative(time) || time.days > 7) {
          stop()
        } else {
          setTime(time)
        }
      }, intervalDelay)
    )
  }

  const stop = () => {
    if (clock) {
      clearInterval(clock)
    }
  }

  useEffect(() => {
    if (time.days <= 7) {
      start()
    }
    return () => stop()
  }, [])

  return time.days <= 7 ? (
    <span {...rest}>{Time.toTimeString(time)}</span>
  ) : (
    <span {...rest}>{Time.toDateString(date, actualLanguage)}</span>
  )
}
