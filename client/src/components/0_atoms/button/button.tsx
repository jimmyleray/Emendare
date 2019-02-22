import React, { CSSProperties } from 'react'
import { Link } from 'react-router-dom'

interface IProps {
  children?: React.ReactNode
  style?: CSSProperties
  onClick?: () => void
  className?: string
  disabled?: boolean
  title?: string
  type?: string
  to?: string
}

export const Button = React.memo(
  ({ children, className = '', ...rest }: IProps) =>
    rest.to && !rest.disabled ? (
      <Link to={rest.to} className={'button ' + className} {...rest}>
        {children}
      </Link>
    ) : (
      <button className={'button ' + className} {...rest}>
        {children}
      </button>
    )
)
