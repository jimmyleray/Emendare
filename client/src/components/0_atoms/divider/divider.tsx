import React from 'react'

interface IProps {
  content: string
  className?: string
}

export const Divider = ({ content, className = '', ...rest }: IProps) => (
  <div className={'is-divider ' + className} {...rest} data-content={content} />
)
