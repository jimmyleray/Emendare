import React from 'react'
import { Providers, Routes } from '../layouts'
import { socket } from '../utils'

export const App = () => {
  socket.on('connect', () => {
    console.log('user connected')
  })
  return (
    <Providers>
      <Routes />
    </Providers>
  )
}
