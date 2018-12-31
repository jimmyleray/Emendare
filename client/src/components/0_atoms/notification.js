import React from 'react'

export const Notification = ({ children, className = '', ...rest }) => (
  <div className={'notification ' + className} {...rest}>
    {children}
  </div>
)
