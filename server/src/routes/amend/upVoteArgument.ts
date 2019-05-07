import socketIO from 'socket.io'
import { Amend } from '../../models'

export const upVoteArgument = {
  name: 'upVoteArgument',
  callback: ({
    socket,
    io
  }: {
    socket: socketIO.Socket
    io: socketIO.Server
  }) => async ({ data, token }: any) => {
    try {
      const response: any = await Amend.upVoteArgument(
        data.amendID,
        data.argumentID,
        token
      )
      if (response.data) {
        io.emit(`amend/${data.amendID}`, response)
      } else {
        socket.emit('updVoteArgument', response)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
