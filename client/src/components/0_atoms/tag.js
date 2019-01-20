import React from 'react'

export const Tag = ({ children, className = '', ...rest }) => (
  <span className={'tag ' + className} {...rest}>
    {children}
  </span>
)
