import React from 'react'
import PropTypes from 'prop-types'
import { Time } from '../../components'
import { convertMsToTime, getTimeLeft } from '../../services/helpers'

export class CountDown extends React.Component {
  constructor(props) {
    super(props)

    this.startCountDown = intervalDelay => {
      this.setState({ intervalDelay })
      // update the Time
      this.clock = setInterval(() => {
        let time = convertMsToTime(getTimeLeft(this.props.date))
        // Check if the countdown is finished else update the state
        time.hrs <= 0 && time.min <= 0 && time.sec <= 0
          ? this.stop()
          : this.setState({
              time: { sec: time.sec, min: time.min, hrs: time.hrs }
            })
      }, intervalDelay)
    }

    this.stopCountDown = () => clearInterval(this.clock)

    this.state = {
      time: null,
      intervalDelay: 1000
    }
  }

  componentDidMount() {
    this.startCountDown(this.state.intervalDelay)
  }

  componentDidUpdate() {
    const { time, intervalDelay } = this.state
    if (time !== null) {
      // if the timeleft is under 1 minutes set the intervalDelay to 1sec else set to 1min
      if (time.min === 0 && time.hrs === 0 && intervalDelay !== 1000) {
        this.stopCountDown()
        this.startCountDown(1000)
      } else if (time.min !== 0 && intervalDelay !== 60000) {
        this.stopCountDown()
        this.startCountDown(60000)
      }
    }
  }

  componentWillUnmount() {
    this.stopCountDown()
  }
  render() {
    const { time } = this.state
    const { className, ...rest } = this.props
    return <Time time={time} className={className} {...rest} />
  }
}

CountDown.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.instanceOf(Date)
  ]),
  className: PropTypes.string
}
