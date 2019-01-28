import React from 'react'

export const Column = ({ children, className = '', ...rest }) => (
  <div className={'column ' + className} {...rest}>
    {children}
  </div>
)
