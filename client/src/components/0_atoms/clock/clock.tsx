import React from 'react'
import { Time } from '../../../services'
import { ITime } from '../../../../../interfaces'

interface IClockProps {
  date: Date | string
  className?: string
}

interface IClockState {
  time: ITime
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
        time: getTime(this.props.date)
      }
    }

    public componentDidMount() {
      this.start()
    }

    public componentWillUnmount() {
      this.stop()
    }

    public render() {
      return <span {...this.props}>{Time.toTimeString(this.state.time)}</span>
    }

    private start = (intervalDelay: number = 1000) => {
      const timeToDisplay: ITime = getTime(this.props.date)

      const second = 1000
      const minute = 60 * second
      const hour = 60 * minute
      const day = 24 * hour

      intervalDelay =
        timeToDisplay.days > 0
          ? day
          : timeToDisplay.hours > 0
          ? hour
          : timeToDisplay.minutes > 0
          ? minute
          : timeToDisplay.seconds > 0
          ? second
          : intervalDelay

      this.clock = window.setInterval(() => {
        const time: ITime = getTime(this.props.date)
        if (Time.isNegative(time)) {
          this.stop()
        } else {
          this.setState({ time })
        }
      }, intervalDelay)
    }

    private stop = () => {
      if (this.clock) {
        clearInterval(this.clock)
      }
    }
  }
}
