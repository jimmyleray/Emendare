import React from 'react'

export const Divider = ({ content, className = '', ...rest }) => (
  <div className={'is-divider ' + className} {...rest} data-content={content} />
)
