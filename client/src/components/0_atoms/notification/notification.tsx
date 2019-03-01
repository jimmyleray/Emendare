import React from 'react'

interface IProps {
  /** children node */
  children: React.ReactNode
  /** Additional CSS UI class */
  className?: string
  /** onClick event */
  onClick?: any
  /** Custom CSS */
  style?: React.CSSProperties
}

export const Notification = React.memo(
  ({ children, className = '', ...rest }: IProps) => (
    <div className={'notification ' + className} {...rest}>
      {children}
    </div>
  )
)
