import { Time } from '../../services'
import { Clock } from '../../components'

const getStopWatchTime = ({ date }) =>
  Time.convertMsToTime(Time.getTimeSpent(date))

export const StopWatch: any = Clock(getStopWatchTime)
