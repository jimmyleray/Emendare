import React, { CSSProperties } from 'react'

interface IProps {
  children: React.ReactNode
  className?: string
  style?: CSSProperties
}

export const Notification = ({ children, className = '', ...rest }: IProps) => (
  <div className={'notification ' + className} {...rest}>
    {children}
  </div>
)
