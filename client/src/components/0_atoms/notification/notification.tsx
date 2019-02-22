import React, { CSSProperties } from 'react'

interface IProps {
  children: React.ReactNode
  className?: string
  onClick?: any
  style?: CSSProperties
}

export const Notification = React.memo(
  ({ children, className = '', ...rest }: IProps) => (
    <div className={'notification ' + className} {...rest}>
      {children}
    </div>
  )
)
