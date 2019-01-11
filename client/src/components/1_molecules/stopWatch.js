import PropTypes from 'prop-types'
import { TimeService } from '../../services'
import { Time } from '../../components'
import { withClock } from '../2_organisms/clock'

const getStopWatchTime = date => {
  return { time: TimeService.convertMsToTime(TimeService.getTimeSpent(date)) }
}
export const StopWatch = withClock(({ date }) => getStopWatchTime(date))(Time)

StopWatch.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.instanceOf(Date)
  ]),
  className: PropTypes.string
}
