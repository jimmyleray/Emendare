import React from 'react'

interface IProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

export const Grid = ({ children, style = {}, ...rest }: IProps) => (
  <div className="grid" style={{ ...style, display: 'grid' }} {...rest}>
    {children}
  </div>
)
