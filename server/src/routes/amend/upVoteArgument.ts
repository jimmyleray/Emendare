import socketIO from 'socket.io'
import { Amend } from '../../models'

export const upVoteArgument = {
  name: 'upVoteArgument',
  callback: ({
    io,
    socket
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
  }) => async ({ token, data }: any) => {
    try {
      const response = await Amend.postAmend(data, token)
      if (response.data) {
        io.emit(`amend/${data.amendID}`, response)
      } else {
        socket.emit('upVoteArgument', response)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
