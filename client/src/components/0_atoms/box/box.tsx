import React from 'react'

interface IProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const Box = ({ children, className = '', ...rest }: IProps) => (
  <React.Fragment>
    <div className={'is-hidden-mobile box ' + className} {...rest}>
      {children}
    </div>
    <div className={'is-hidden-tablet ' + className} {...rest}>
      {children}
    </div>
  </React.Fragment>
)
