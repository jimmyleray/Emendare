import socketIO from 'socket.io'
import { User } from '../../models'

export const login = {
  name: 'login',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    token,
    data
  }: any) => {
    let res
    if (!data && token) {
      res = await User.login('', '', token)
    } else if (data) {
      res = await User.login(data.email, data.password, token)
      if (!res) {
        res = {
          error: {
            code: 500,
            message: 'Problème avec le service de login'
          }
        }
      }
    } else {
      res = {
        error: {
          code: 405,
          message: 'La requête est invalide'
        }
      }
    }
    socket.emit('login', res)
  }
}
