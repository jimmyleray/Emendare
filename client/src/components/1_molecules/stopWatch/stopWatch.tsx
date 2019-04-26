import { Time } from '../../../services'
import { Clock } from '../../../components'
import { ITime } from '../../../../../interfaces'

const getStopWatchTime = (date: Date | string): ITime =>
  Time.convertMsToTime(Time.getTimeSpent(date))

interface IStopWatchProps {
  /** Beginning date */
  data: Date | string
  /** Additional CSS UI class */
  className?: string
}
export const StopWatch = Clock(getStopWatchTime)
