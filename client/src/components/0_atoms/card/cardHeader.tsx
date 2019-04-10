import React from 'react'

interface ICardHeaderProps {
  /** Children nodes */
  children: React.ReactNode
  /** Additional CSS UI class */
  className?: string
  /** CSS style */
  style?: React.CSSProperties
}

/** Header */
export const Header = ({ className, children, ...rest }: ICardHeaderProps) => (
  <div className={`card-header ${className}`} {...rest}>
    {children}
  </div>
)

const Title = ({ className, children, ...rest }: ICardHeaderProps) => (
  <div className={`card-header-title ${className}`} {...rest}>
    {children}
  </div>
)

const Icon = ({ className, children, ...rest }: ICardHeaderProps) => (
  <div className={`card-header-icon ${className}`} {...rest}>
    {children}
  </div>
)

Header.Title = Title
Header.Icon = Icon
