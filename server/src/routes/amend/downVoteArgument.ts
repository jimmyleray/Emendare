import socketIO from 'socket.io'
import { Amend } from '../../models'

export const downVoteArgument = {
  name: 'downVoteArgument',
  callback: ({
    socket,
    io
  }: {
    socket: socketIO.Socket
    io: socketIO.Server
  }) => async ({ data, token }: any) => {
    try {
      const response: any = await Amend.downVoteArgument(
        data.amendID,
        data.argumentID,
        token
      )
      if (response.data) {
        io.emit(`amend/${data.amendID}`, response)
      } else {
        socket.emit('unVoteArgument', response)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
