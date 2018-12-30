import React from 'react'

export const Column = ({ children, className = '' }) => (
  <div className={'column ' + className}>{children}</div>
)
