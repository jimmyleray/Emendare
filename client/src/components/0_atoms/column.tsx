import React from 'react'

interface IProps {
  children: React.ReactNode
  className?: string
}

export const Column = ({ children, className = '', ...rest }: IProps) => (
  <div className={'column ' + className} {...rest}>
    {children}
  </div>
)
