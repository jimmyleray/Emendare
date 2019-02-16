import React, { CSSProperties } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { startsWith } from 'lodash'

interface IProps {
  children: React.ReactNode
  style?: CSSProperties
  onClick?: any
  className?: string
  title?: string
  to: string
}

export const Link = ({ children, title, to, ...rest }: IProps) =>
  startsWith(to, 'http') ? (
    <a href={to} title={title} target="_blank" {...rest}>
      {children}
    </a>
  ) : (
    <RouterLink to={to} title={title} {...rest}>
      {children}
    </RouterLink>
  )
