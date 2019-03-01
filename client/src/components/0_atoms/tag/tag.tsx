import React from 'react'

interface IProps {
  /** Children node */
  children: React.ReactNode
  /** Additional CSS IU class */
  className?: string
}

export const Tag = React.memo(
  ({ children, className = '', ...rest }: IProps) => (
    <span className={'tag ' + className} {...rest}>
      {children}
    </span>
  )
)
