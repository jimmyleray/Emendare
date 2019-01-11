import React from 'react'
// import helpers
import { TimeService } from '../../services'

export const Time = ({ time, defaultView, ...rest }) => (
  <span {...rest}>{TimeService.toTimeString(time, defaultView)}</span>
)
