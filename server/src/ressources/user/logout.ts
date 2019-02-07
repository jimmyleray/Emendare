import socketIO from 'socket.io'
import { User } from '../../models'

export const logout = {
  name: 'logout',
  callback: ({
    io,
    socket,
    session
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
    session: any
  }) => async ({ token }: any) => {
    const user = await User.model.findOne({ token })
    if (user) {
      user.token = null
      await user.save()
      session.user = null
    }
    socket.emit('logout')
  }
}
