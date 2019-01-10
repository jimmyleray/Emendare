import React from 'react'
import PropTypes from 'prop-types'
import { Time } from '../../components'
import { convertMsToTime, getTimeSpent } from '../../services/helpers'

export class StopWatch extends React.Component {
  constructor(props) {
    super(props)

    this.startClock = intervalDelay => {
      this.setState({ intervalDelay })
      // update the time
      this.clock = setInterval(() => {
        let time = convertMsToTime(getTimeSpent(this.props.date))
        this.setState({ time: { sec: time.sec, min: time.min, hrs: time.hrs } })
      }, intervalDelay)
    }

    this.stopClock = () => clearInterval(this.clock)

    this.state = {
      time: null,
      intervalDelay: 1000
    }
  }

  componentDidMount() {
    this.startClock(this.state.intervalDelay)
  }

  componentDidUpdate() {
    const { time, intervalDelay } = this.state
    if (time !== null) {
      // if the timeleft is under 1 minutes set the intervalDelay to 1sec else set to 1min
      if (time.min === 0 && time.hrs === 0 && intervalDelay !== 1000) {
        this.stopClock()
        this.startClock(1000)
      } else if (time.min !== 0 && intervalDelay !== 60000) {
        this.stopClock()
        this.startClock(60000)
      }
    }
  }

  componentWillUnmount() {
    this.stopClock()
  }

  render() {
    const { className, ...rest } = this.props
    const { time } = this.state
    return <Time time={time} className={className} {...rest} />
  }
}

StopWatch.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.instanceOf(Date)
  ]),
  className: PropTypes.string
}
