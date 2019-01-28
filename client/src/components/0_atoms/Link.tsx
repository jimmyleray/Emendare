import React, { CSSProperties } from 'react'
import { Link as RouterLink } from 'react-router-dom'

interface IProps {
  children: React.ReactNode
  style?: CSSProperties
  className?: string
  to: string
}

export const Link = ({ children, to, ...rest }: IProps) =>
  to.indexOf('http') === 0 ? (
    <a href={to} {...rest}>
      {children}
    </a>
  ) : (
    <RouterLink to={to} {...rest}>
      {children}
    </RouterLink>
  )
