import React from 'react'

export const Icon = ({ type, className = '', ...rest }) => (
  <span className={'icon ' + className} {...rest}>
    <i className={type} />
  </span>
)
