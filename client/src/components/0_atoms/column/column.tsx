import React from 'react'

interface IProps {
  /** Children node */
  children: React.ReactNode
  /** Additional CSS UI class  */
  className?: string
}

export const Column = ({ children, className = '', ...rest }: IProps) => (
  <div className={'column ' + className} {...rest}>
    {children}
  </div>
)
