/**
 *  This component can be used in two different modes :
 *    props.inverse = true : It will have the behaviour of a stopwatch
 *    props.inverse = false : It will have the behaviour of a countdown
 * */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Clock extends Component {
  constructor(props) {
    super(props)

    this.convertMsToTime = ms => {
      let sec = Math.floor(ms / 1000)
      const hrs = Math.floor(sec / 3600)
      const min = Math.floor((sec - hrs * 3600) / 60)

      // Re-calculate secondes
      sec = sec - (min * 60 + hrs * 3600)
      return { sec: sec, min: min, hrs: hrs }
    }

    this.startClock = intervalDelay => {
      // Set the new delay
      this.setState({ intervalDelay })
      // update the date every secondes
      this.interval = setInterval(() => {
        let date
        // If the component is in mode CountDown
        if (!this.props.inverse) {
          date = this.convertMsToTime(
            -Math.floor(
              new Date().getTime() -
                (new Date(this.props.date).getTime() + this.props.delay)
            )
          )
          // Check if the countdown is finished else update the state
          date.hrs <= 0 && date.min <= 0 && date.sec <= 0
            ? this.stop()
            : this.setState({ sec: date.sec, min: date.min, hrs: date.hrs })
        }
        // If the componenent is in mode stopwatch
        else {
          date = this.convertMsToTime(
            Math.floor(
              new Date().getTime() - new Date(this.props.date).getTime()
            )
          )
          this.setState({ sec: date.sec, min: date.min, hrs: date.hrs })
        }
      }, intervalDelay)
    }

    this.stopClock = () => {
      clearInterval(this.interval)
    }

    this.state = {
      sec: 0,
      min: 0,
      hrs: 0,
      intervalDelay: 1000
    }
  }

  componentDidMount() {
    this.startClock(this.state.intervalDelay)
  }

  componentDidUpdate() {
    const { min, hrs, intervalDelay } = this.state
    // if the timeleft is under 1 minutes set the intervalDelay to 1sec else set to 1min
    if (min === 0 && hrs === 0 && intervalDelay !== 1000) {
      this.stopClock()
      this.startClock(1000)
    } else if (min !== 0 && intervalDelay !== 60000) {
      this.stopClock()
      this.startClock(60000)
    }
  }

  componentWillUnmount() {
    this.stopClock()
  }

  render() {
    const { className } = this.props
    const { hrs, min, sec } = this.state
    return (
      <span className={className}>
        {min === 0 && sec === 0 && hrs === 0
          ? '-'
          : hrs === 0 && min === 0
          ? `${sec} secondes`
          : `${hrs} heures et ${min} minutes`}
      </span>
    )
  }
}

Clock.propTypes = {
  date: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
  inverse: PropTypes.bool.isRequired,
  className: PropTypes.string
}

Clock.defaultProps = {
  inverse: false
}
