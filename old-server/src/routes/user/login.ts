import socketIO from 'socket.io'
import { User } from '../../models'

export const login = {
  name: 'login',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    token,
    data
  }: any) => {
    let response
    if (!data && token) {
      response = await User.login(undefined, undefined, token)
    } else if (data) {
      response = await User.login(data.email, data.password, token)
    } else {
      response = {
        error: {
          code: 405,
          message: 'La requête est invalide'
        }
      }
    }
    socket.emit('login', response)
  }
}
