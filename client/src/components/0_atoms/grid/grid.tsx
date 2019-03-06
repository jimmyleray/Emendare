import React from 'react'

interface IProps {
  /** Children node */
  children: React.ReactNode
  /** Custom CSS */
  style?: React.CSSProperties
  /** Additional CSS UI class */
  className?: string
}

export const Grid = React.memo(
  ({ children, className, style = {}, ...rest }: IProps) => (
    <div
      className={`grid ${className}`}
      style={{ ...style, display: 'grid' }}
      {...rest}
    >
      {children}
    </div>
  )
)
