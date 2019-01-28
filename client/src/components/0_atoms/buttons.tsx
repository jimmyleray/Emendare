import React from 'react'

export const Buttons = ({ children, className = '', ...rest }) => (
  <div className={'buttons ' + className} {...rest}>
    {children}
  </div>
)
