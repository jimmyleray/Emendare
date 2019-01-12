import PropTypes from 'prop-types'
import { Time } from '../../services'
import { Clock } from '../../components'

const getStopWatchTime = ({ date }) =>
  Time.convertMsToTime(Time.getTimeSpent(date))

export const StopWatch = Clock(getStopWatchTime)

StopWatch.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.instanceOf(Date)
  ]),
  className: PropTypes.string
}
