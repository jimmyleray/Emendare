import React from 'react'

export const Columns = ({ children, className = '' }) => (
  <div className={'columns ' + className}>{children}</div>
)
