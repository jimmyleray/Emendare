import socketIO from 'socket.io'
import config from '../../config'

// Fetch API polyfills
import fetch from 'node-fetch'

export const contributors = {
  name: 'contributors',
  callback: ({
    io,
    socket,
    session
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
    session: any
  }) => async () => {
    const res = await fetch(config.contributions)
    const data: any[] = await res.json()
    socket.emit('contributors', { data })
  }
}
