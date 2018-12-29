import React from 'react'

export const Buttons = ({ children, className = '' }) => (
  <div className={'buttons ' + className}>{children}</div>
)
