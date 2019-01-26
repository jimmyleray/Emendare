import React from 'react'

export const Logo = () => (
  <div style={{ height: '48px', width: '48px', display: 'inline-block' }}>
    <img
      src={'/images/logo-white-arrows.png'}
      alt={'Emendare logo arrows'}
      style={{
        verticalAlign: 'middle',
        width: '48px',
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
        marginLeft: '-48px',
        verticalAlign: 'middle',
        width: '48px',
        animationName: 'bubble',
        animationDuration: '15s',
        animationIterationCount: 'infinite',
        animationDelay: '3s'
      }}
    />
  </div>
)
