import React, { CSSProperties } from 'react'

interface IProps {
  children: React.ReactNode
  style?: CSSProperties
}

export const Grid = React.memo(({ children, style = {}, ...rest }: IProps) => (
  <div className="grid" style={{ ...style, display: 'grid' }} {...rest}>
    {children}
  </div>
))
