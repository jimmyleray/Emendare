import { Time } from '../../../services'
import { Clock } from '../../../components'
import { ITime } from '../../../../../interfaces'

const getStopWatchTime = (date: Date | string): ITime =>
  Time.convertMsToTime(Time.getTimeSpent(date))

export const StopWatch = Clock(getStopWatchTime)
