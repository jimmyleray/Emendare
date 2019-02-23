import React from 'react'

interface IProps {
  children: React.ReactNode
  className?: string
  onClick?: any
  style?: React.CSSProperties
}

export const Notification = ({ children, className = '', ...rest }: IProps) => (
  <div className={'notification ' + className} {...rest}>
    {children}
  </div>
)
