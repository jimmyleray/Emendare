import React, { CSSProperties } from 'react'

interface IProps {
  children: React.ReactNode
  style?: CSSProperties
}

export const Grid = ({ children, style = {}, ...rest }: IProps) => (
  <div style={{ ...style, display: 'grid' }} {...rest}>
    {children}
  </div>
)
