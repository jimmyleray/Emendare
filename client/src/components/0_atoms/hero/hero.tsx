import React from 'react'

interface IProps {
  className?: string
  subtitle: string
  title: string
}

export const Hero = ({ className = '', title, subtitle, ...rest }: IProps) => (
  <section className={'hero ' + className} {...rest}>
    <div className="hero-body">
      <h1 className="title">{title}</h1>
      <h2 className="subtitle">{subtitle}</h2>
    </div>
  </section>
)
