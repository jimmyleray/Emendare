import React from 'react'
import { Header } from './cardHeader'
import { Footer } from './cardFooter'

interface ICardFooterProps {
  /** Children nodes */
  children: React.ReactNode
  /** Additional CSS UI class */
  className?: string
  /** Style */
  style?: React.CSSProperties
}

/** Card */
export const Card = ({ className, children, ...rest }: ICardFooterProps) => (
  <div className={`card ${className}`} {...rest}>
    {children}
  </div>
)

/** Image */
const Image = ({ className, children, ...rest }: ICardFooterProps) => (
  <div className={`card-image ${className}`} {...rest}>
    {children}
  </div>
)

/** Content */
const Content = ({ className, children, ...rest }: ICardFooterProps) => (
  <div className={`card-content ${className}`} {...rest}>
    {children}
  </div>
)

Card.Image = Image
Card.Content = Content
Card.Header = Header
Card.Footer = Footer
