import React from 'react'
import { Link } from 'react-router-dom'

export interface IProps {
  /** Children nodes */
  children?: React.ReactNode
  /** CSS style */
  style?: React.CSSProperties
  /** onClick event */
  onClick?: any
  /** Additional CSS UI class */
  className?: string
  disabled?: boolean
  title?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  /** Path */
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
