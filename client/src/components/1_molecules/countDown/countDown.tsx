import { Time } from '../../../services'
import { Clock } from '../../../components'

const getCountDownTime = (date: Date | string) =>
  Time.convertMsToTime(Time.getTimeLeft(date))

export const CountDown: any = Clock(getCountDownTime)
