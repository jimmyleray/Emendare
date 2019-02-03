import React, { CSSProperties } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { startsWith } from 'lodash'

interface IProps {
  children: React.ReactNode
  style?: CSSProperties
  className?: string
  to: string
}

export const Link = ({ children, to, ...rest }: IProps) =>
  startsWith(to, 'http') ? (
    <a href={to} target="_blank" {...rest}>
      {children}
    </a>
  ) : (
    <RouterLink to={to} {...rest}>
      {children}
    </RouterLink>
  )
