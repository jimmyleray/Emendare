import React from 'react'

export const Notification = ({ children, className = '' }) => (
  <div className={'notification ' + className}>{children}</div>
)
