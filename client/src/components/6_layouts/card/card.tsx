import React from 'react'
// Components
import { Grid } from '../../../components'

interface ICardLayoutProps {
  /** Children nodes */
  children: React.ReactNode
  /** style css */
  style?: React.CSSProperties
  /** additional CSS UI class */
  className?: string
}

export const CardLayout = ({ children, ...rest }: ICardLayoutProps) => (
  <Grid className={'card__container'} {...rest}>
    {children}
  </Grid>
)

const Icon = ({ children, ...rest }: ICardLayoutProps) => (
  <div style={{ gridArea: 'icon', padding: ' 1rem 0 1rem 1rem' }} {...rest}>
    {children}
  </div>
)

const Description = ({ children, ...rest }: ICardLayoutProps) => (
  <div
    style={{ gridArea: 'description', padding: ' 1rem 0 1rem 1rem' }}
    {...rest}
  >
    {children}
  </div>
)

const Detail = ({ children, ...rest }: ICardLayoutProps) => (
  <div style={{ gridArea: 'detail' }} {...rest}>
    {children}
  </div>
)

const Footer = ({ children, ...rest }: ICardLayoutProps) => (
  <div style={{ gridArea: 'footer', padding: '0 1rem 1rem 1rem' }} {...rest}>
    {children}
  </div>
)

CardLayout.Icon = Icon
CardLayout.Description = Description
CardLayout.Detail = Detail
CardLayout.Footer = Footer
