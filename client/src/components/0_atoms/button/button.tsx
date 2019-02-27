import React from 'react'
import { Link } from 'react-router-dom'

export interface IProps {
  /** Children nodes */
  children?: React.ReactNode
  /** CSS style */
  style?: React.CSSProperties
  /** onClick event */
  onClick?: () => void
  /** Additional CSS UI class */
  className?: string
  disabled?: boolean
  title?: string
  type?: string
  /** Path */
  to?: string
}

export const Button = ({ children, className = '', ...rest }: IProps) =>
  rest.to && !rest.disabled ? (
    <Link to={rest.to} className={'button is-rounded ' + className} {...rest}>
      {children}
    </Link>
  ) : (
    <button className={'button is-rounded ' + className} {...rest}>
      {children}
    </button>
  )
