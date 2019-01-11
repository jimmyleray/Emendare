import PropTypes from 'prop-types'
import { TimeService } from '../../services'
import { Time } from '../../components'
import { withClock } from '../2_organisms/clock'

const getCountDownTime = date => {
  let time = TimeService.convertMsToTime(TimeService.getTimeLeft(date))
  return { time: time, stop: TimeService.isTimeZeros(time) }
}
export const CountDown = withClock(({ date }) => getCountDownTime(date))(Time)

CountDown.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.instanceOf(Date)
  ]),
  className: PropTypes.string
}
