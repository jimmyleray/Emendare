import React from 'react'

interface IProps {
  /** Children node */
  children: React.ReactNode
  /** Custom CSS  */
  style?: React.CSSProperties
  /** additional CSS UI class*/
  className?: string
}

export const Buttons = React.memo(
  ({ children, className = '', ...rest }: IProps) => (
    <div className={'buttons ' + className} {...rest}>
      {children}
    </div>
  )
)
