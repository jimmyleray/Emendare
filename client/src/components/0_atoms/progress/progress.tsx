import React from 'react'

interface IProps {
  /** Children node */
  children: React.ReactNode
  /** Additional CSS UI class */
  className?: string
  /** Set value to the progress */
  value?: number
  /** Set a maximum */
  max?: number
}

export const Progress = ({ children, className = '', ...rest }: IProps) => (
  <progress className={'progress ' + className} {...rest}>
    {children}
  </progress>
)
