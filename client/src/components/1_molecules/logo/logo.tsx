import React from 'react'

interface ILogoProps {}

export const Logo = () => (
  <div style={{ height: '28px', width: '28px', display: 'inline-block' }}>
    <img
      src={'/images/logo-white-arrows.png'}
      alt={'Emendare logo arrows'}
      style={{
        verticalAlign: 'middle',
        width: '28px',
        animationName: 'rotate',
        animationDuration: '15s',
        animationIterationCount: 'infinite',
        animationDelay: '3s'
      }}
    />
    <img
      src={'/images/logo-white-bubble.png'}
      alt={'Emendare logo bubble'}
      style={{
        marginLeft: '-28px',
        verticalAlign: 'middle',
        width: '28px',
        animationName: 'bubble',
        animationDuration: '15s',
        animationIterationCount: 'infinite',
        animationDelay: '2s'
      }}
    />
  </div>
)
