import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

export const Link = ({ children, to, ...rest }) =>
  to.indexOf('http') === 0 ? (
    <a href={to} {...rest}>
      {children}
    </a>
  ) : (
    <RouterLink to={to} {...rest}>
      {children}
    </RouterLink>
  )
