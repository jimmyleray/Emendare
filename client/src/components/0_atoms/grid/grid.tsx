import React from 'react'

interface IProps {
  /** Children node */
  children: React.ReactNode
  /** Custom CSS */
  style?: React.CSSProperties
  /** Additional CSS UI class */
  className?: string
  /* Set inline-grid*/
  isInline?: boolean
}

export const Grid = React.memo(
  ({
    children,
    className = '',
    style = {},
    isInline = false,
    ...rest
  }: IProps) => (
    <div
      className={`${className}`}
      style={{ ...style, display: isInline ? 'inline-grid' : 'grid' }}
      {...rest}
    >
      {children}
    </div>
  )
)
