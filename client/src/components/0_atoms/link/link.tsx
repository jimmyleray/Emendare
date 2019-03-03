import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { startsWith } from 'lodash'

interface IProps {
  children: React.ReactNode
  style?: React.CSSProperties
  onClick?: any
  className?: string
  title?: string
  to: any
}

export const Link = React.memo(({ children, title, to, ...rest }: IProps) =>
  startsWith(to, 'http') ? (
    <a href={to} title={title} target="_blank" {...rest}>
      {children}
    </a>
  ) : (
    <RouterLink to={to} title={title} {...rest}>
      {children}
    </RouterLink>
  )
)
