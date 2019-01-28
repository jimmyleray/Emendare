import React, { CSSProperties } from 'react'

interface IProps {
  children: React.ReactNode
  className?: string
  style?: CSSProperties
}

export const Box = ({ children, className = '', ...rest }: IProps) => (
  <div className={'box ' + className} {...rest}>
    {children}
  </div>
)
