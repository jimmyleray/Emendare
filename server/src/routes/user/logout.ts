import socketIO from 'socket.io'
import { User } from '../../models'

export const logout = {
  name: 'logout',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    token
  }: any) => {
    const user = await User.model.findOne({ token })
    if (user) {
      user.token = null
      await user.save()
    }
    socket.emit('logout')
  }
}
