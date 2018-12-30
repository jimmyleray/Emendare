import React from 'react'

export const Box = ({ children, className = '' }) => (
  <div className={'box ' + className}>{children}</div>
)
