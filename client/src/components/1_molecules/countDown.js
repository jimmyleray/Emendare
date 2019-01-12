import PropTypes from 'prop-types'
import { Time } from '../../services'
import { Clock } from '../../components'

const getCountDownTime = ({ date }) =>
  Time.convertMsToTime(Time.getTimeLeft(date))

export const CountDown = Clock(getCountDownTime)

CountDown.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.instanceOf(Date)
  ]),
  className: PropTypes.string
}
