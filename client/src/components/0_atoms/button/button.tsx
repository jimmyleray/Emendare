import React from 'react'
import { Link } from 'react-router-dom'

interface IProps {
  children?: React.ReactNode
  style?: React.CSSProperties
  onClick?: () => void
  className?: string
  disabled?: boolean
  title?: string
  type?: string
  to?: string
}

export const Button = ({ children, className = '', ...rest }: IProps) =>
  rest.to && !rest.disabled ? (
    <Link to={rest.to} className={'button ' + className} {...rest}>
      {children}
    </Link>
  ) : (
    <button className={'button ' + className} {...rest}>
      {children}
    </button>
  )
