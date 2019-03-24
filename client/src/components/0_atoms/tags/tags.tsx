import React from 'react'

interface IProps {
  /** Children node */
  children: React.ReactNode
  /** Additional CSS IU class */
  className?: string
}

export const Tags = React.memo(
  ({ children, className = '', ...rest }: IProps) => (
    <div className={'tags ' + className} {...rest}>
      {children}
    </div>
  )
)
