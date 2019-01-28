import React from 'react'
import { Time } from '../../services'
import { ITime } from '../../interfaces'

interface IClockProps {
  date: Date | string
  className: string
}

interface IClockState {
  time: ITime
  intervalDelay: number
}

/**
 * HOC which update a time object {sec: number, min:number, hrs: number}
 * each second when the time is under 1 min else each minute
 *
 *  @param {function} getTime  provides a time object
 */
export const Clock = (getTime: any) => {
  return class extends React.Component<IClockProps, IClockState> {
    private clock: number = 0

    constructor(props: IClockProps) {
      super(props)

      this.state = {
        time: getTime(this.props.date),
        intervalDelay: 1000
      }
    }

    public componentDidMount() {
      this.start(this.state.intervalDelay)
    }

    public componentWillUnmount() {
      this.stop()
    }

    public render() {
      return <span {...this.props}>{Time.toTimeString(this.state.time)}</span>
    }

    private start = (intervalDelay: number) => {
      this.setState({ intervalDelay })
      this.clock = window.setInterval(() => {
        const time: ITime = getTime(this.props.date)
        if (Time.isNegative(time)) {
          this.stop()
        } else {
          this.setState({ time })
          this.update(time)
        }
      }, intervalDelay)
    }

    private update = (time: ITime) => {
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

    private stop = () => {
      if (this.clock) {
        window.clearInterval(this.clock)
      }
    }
  }
}
