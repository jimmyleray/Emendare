import React from 'react'

interface IProps {
  children: React.ReactNode
  className?: string
}

export const Progress = ({ children, className = '', ...rest }: IProps) => (
  <progress className={'progress ' + className} {...rest}>
    {children}
  </progress>
)
