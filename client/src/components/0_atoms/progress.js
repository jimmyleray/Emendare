import React from 'react'

export const Progress = ({ children, className = '', ...rest }) => (
  <progress className={'progress ' + className} {...rest}>
    {children}
  </progress>
)
