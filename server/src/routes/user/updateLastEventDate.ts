import socketIO from 'socket.io'
import { User } from '../../models'

export const updateLastEventDate = {
  name: 'updateLastEventDate',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    token
  }: any) => {
    if (token) {
      const res = await User.updateLastEventDate(token)
      if ('data' in res) {
        socket.emit('user', res)
        socket.emit('updateLastEventDate')
      } else {
        socket.emit('updateLastEventDate', res)
      }
    } else {
      socket.emit('updateLastEventDate', {
        error: { code: 405, message: 'Le token est invalide' }
      })
      socket.emit('logout')
    }
  }
}
