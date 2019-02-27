import React from 'react'

interface IProps {
  /** Children node */
  children: React.ReactNode
  /** Custom CSS */
  style?: React.CSSProperties
}

export const Grid = ({ children, style = {}, ...rest }: IProps) => (
  <div className="grid" style={{ ...style, display: 'grid' }} {...rest}>
    {children}
  </div>
)
