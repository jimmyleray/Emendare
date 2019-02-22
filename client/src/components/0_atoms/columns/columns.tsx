import React from 'react'

interface IProps {
  children: React.ReactNode
  className?: string
}

export const Columns = React.memo(
  ({ children, className = '', ...rest }: IProps) => (
    <div className={'columns ' + className} {...rest}>
      {children}
    </div>
  )
)
