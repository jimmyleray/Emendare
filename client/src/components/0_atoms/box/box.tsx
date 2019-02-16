import React, { CSSProperties } from 'react'

interface IProps {
  children: React.ReactNode
  className?: string
  style?: CSSProperties
}

export const Box = ({ children, className = '', ...rest }: IProps) => (
  <>
    <div className={'is-hidden-mobile box ' + className} {...rest}>
      {children}
    </div>
    <div className={'is-hidden-tablet ' + className} {...rest}>
      {children}
    </div>
  </>
)
