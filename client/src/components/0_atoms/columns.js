import React from 'react'

export const Columns = ({ children, className = '', ...rest }) => (
  <div className={'columns ' + className} {...rest}>
    {children}
  </div>
)
