import React from 'react'

interface IMediaProps {
  /** Children nodes */
  children: React.ReactNode
  /** Additional CSS UI class */
  className?: string
  /** Style CSS */
  style?: React.CSSProperties
}

export const Media = ({ children, className, ...rest }: IMediaProps) => (
  <div className={`media ${className}`} {...rest}>
    {children}
  </div>
)

const Content = ({ children, className, ...rest }: IMediaProps) => (
  <div className={`media-content ${className}`} {...rest}>
    {children}
  </div>
)

const Left = ({ children, className, ...rest }: IMediaProps) => (
  <div className={`media-left ${className}`} {...rest}>
    {children}
  </div>
)

const Right = ({ children, className, ...rest }: IMediaProps) => (
  <div className={`media-right ${className}`} {...rest}>
    {children}
  </div>
)

const Item = ({ children, className, ...rest }: IMediaProps) => (
  <div className={`media-item ${className}`} {...rest}>
    {children}
  </div>
)

Media.Content = Content
Media.Left = Left
Media.Right = Right
