import React from 'react'

interface IBackgroundProps {
  /** Children node */
  children: React.ReactNode
  /** Color of the background */
  color?: string
  /** Additional CSS UI class */
  className?: string
  /** CSS style */
  style?: React.CSSProperties
}

export const Background = React.memo(
  ({ children, color, ...rest }: IBackgroundProps) => (
    <div style={{ backgroundColor: color, padding: '1.5rem' }} {...rest}>
      {children}
    </div>
  )
)
