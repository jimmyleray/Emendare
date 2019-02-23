import React from 'react'

interface IProps {
  content?: string
  className?: string
  vertical?: boolean
  style?: React.CSSProperties
}

export const Divider = ({
  content,
  vertical = false,
  className = '',
  ...rest
}: IProps) => (
  <div
    className={(vertical ? 'is-divider-vertical ' : 'is-divider ') + className}
    data-content={content}
    {...rest}
  />
)
