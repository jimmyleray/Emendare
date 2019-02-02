import React from 'react'

interface IProps {
  children: React.ReactNode
  className?: string
}

export const Tag = ({ children, className = '', ...rest }: IProps) => (
  <span className={'tag ' + className} {...rest}>
    {children}
  </span>
)
