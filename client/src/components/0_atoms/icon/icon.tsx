import React from 'react'

interface IProps {
  /** Name of the icon */
  type: string
  /** Additional CSS UI class */
  className?: string
  title?: string
}

export const Icon = React.memo(({ type, className = '', ...rest }: IProps) => (
  <span className={'icon ' + className} {...rest}>
    <i className={type} />
  </span>
))
