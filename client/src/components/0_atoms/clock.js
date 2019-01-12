import React from 'react'
import { Time } from '../../services'

/**
 * HOC which update a time object {sec: number, min:number, hrs: number}
 * each second when the time is under 1 min else each minute
 *
 *  @param {function} getTime  provides a time object
 */
export const Clock = getTime => {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        time: getTime(this.props),
        intervalDelay: 1000
      }
    }

    componentDidMount() {
      this.start(this.state.intervalDelay)
    }

    componentWillUnmount() {
      this.stop()
    }

    start = intervalDelay => {
      this.setState({ intervalDelay })
      this.clock = setInterval(() => {
        const time = getTime(this.props)
        if (Time.isNegative(time)) {
          this.stop()
        } else {
          this.setState({ time })
          this.update(time)
        }
      }, intervalDelay)
    }

    update = time => {
      // if the time is under 1 minute set the
      // intervalDelay to 1 second else set to 1 minute
      const { intervalDelay } = this.state
      if (
        time.minutes === 0 &&
        time.hours === 0 &&
        time.days === 0 &&
        intervalDelay !== 1000
      ) {
        this.stop()
        this.start(1000)
      } else if (time.minutes !== 0 && intervalDelay !== 60000) {
        this.stop()
        this.start(60000)
      } else {
        this.stop()
      }
    }

    stop = () => {
      if (this.clock) clearInterval(this.clock)
    }

    render() {
      return <span {...this.props}>{Time.toTimeString(this.state.time)}</span>
    }
  }
}
