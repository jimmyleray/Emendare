import React from 'react'

export const Box = ({ children, className = '', ...rest }) => (
  <div className={'box ' + className} {...rest}>
    {children}
  </div>
)
