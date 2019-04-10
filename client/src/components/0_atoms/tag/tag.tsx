import React from 'react'

interface IProps {
  /** Children node */
  children: React.ReactNode
  /** Additional CSS IU class */
  className?: string
  /** Style CSS */
  style?: React.CSSProperties
}

export const Tag = React.memo(
  ({ children, className = '', ...rest }: IProps) => (
    <span className={'tag ' + className} {...rest}>
      {children}
    </span>
  )
)
