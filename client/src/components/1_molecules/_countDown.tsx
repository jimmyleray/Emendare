import { Time } from '../../services'
import { Clock } from '..'

const getCountDownTime = (date: Date | string) =>
  Time.convertMsToTime(Time.getTimeLeft(date))

export const CountDown: any = Clock(getCountDownTime)
