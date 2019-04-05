import React from 'react'

interface ICardProps {
  /** Children nodes */
  children: React.ReactNode
  /** Additional CSS UI class */
  className?: string
  /** CSS Style */
  style?: React.CSSProperties
}

/** Footer */
export const Footer = ({ className, children, ...rest }: ICardProps) => (
  <div className={`card-footer ${className}`} {...rest}>
    {children}
  </div>
)

const Item = ({ className, children, ...rest }: ICardProps) => (
  <div className={`card-footer-item ${className}`} {...rest}>
    {children}
  </div>
)

Footer.Item = Item
