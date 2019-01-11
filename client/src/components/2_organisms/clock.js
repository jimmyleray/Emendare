/**
 * HOC which update a time object {sec: number, min:number, hrs: number} each second
 * when the time is under 1 min else each minute
 *
 *  @param {function} getTime  provides a time object and, in option, a boolean stop which can stop the clock
 */
import React from 'react'

export const withClock = getTime => Component => {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        time: null,
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
        const { time, stop } = getTime(this.props)
        if (stop === true) this.stop()
        else {
          this.setState({ time })
          this.update(time)
        }
      }, intervalDelay)
    }

    update = time => {
      //if the timeleft is under 1 minutes set the intervalDelay to 1sec else set to 1min
      const { intervalDelay } = this.state
      if (time.min === 0 && time.hrs === 0 && intervalDelay !== 1000) {
        this.stop()
        this.start(1000)
      } else if (time.min !== 0 && intervalDelay !== 60000) {
        this.stop()
        this.start(60000)
      }
    }

    stop = () => {
      if (this.clock) clearInterval(this.clock)
    }

    render() {
      return <Component time={this.state.time} {...this.props} />
    }
  }
}
