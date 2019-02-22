import React from 'react'

interface IProps {
  type: string
  className?: string
  title?: string
}

export const Icon = React.memo(({ type, className = '', ...rest }: IProps) => (
  <span className={'icon ' + className} {...rest}>
    <i className={type} />
  </span>
))
