import React, { CSSProperties } from 'react'

interface IProps {
  children: React.ReactNode
  style?: CSSProperties
  className?: string
}

export const Buttons = ({ children, className = '', ...rest }: IProps) => (
  <div className={'buttons ' + className} {...rest}>
    {children}
  </div>
)
