import socketIO from 'socket.io'
import { User } from '../../models'

export const activation = {
  name: 'activation',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    data
  }: any) => {
    const response = await User.activateUser(data.activationToken)
    socket.emit('activation', response)
  }
}
