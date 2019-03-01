import React from 'react'

interface IProps {
  /** Addtional CSS UI class */
  className?: string
}

export const Spacer = React.memo(({ className = '' }: IProps) => (
  <div className={className} style={{ flex: 1 }} />
))
