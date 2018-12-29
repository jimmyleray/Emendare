import React from 'react'

export const Icon = ({ type, className = '' }) => (
  <span className={'icon ' + className}>
    <i className={type} />
  </span>
)
