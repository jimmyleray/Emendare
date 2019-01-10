import React from 'react'
// import helpers
import { toTimeString } from '../../services/helpers'

export const Time = ({ time, className = '', ...rest }) => (
  <span className={className} {...rest}>
    {toTimeString(time)}
  </span>
)
