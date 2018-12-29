import React from 'react'
import { Link } from 'react-router-dom'

export const Button = ({ children, className = '', ...rest }) =>
  rest.to ? (
    <Link to={rest.to} className={'button ' + className} {...rest}>
      {children}
    </Link>
  ) : (
    <button className={'button ' + className} {...rest}>
      {children}
    </button>
  )
