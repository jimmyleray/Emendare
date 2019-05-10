import socketIO from 'socket.io'
import { Amend } from '../../models'

export const postArgument = {
  name: 'postArgument',
  callback: ({
    socket,
    io
  }: {
    socket: socketIO.Socket
    io: socketIO.Server
  }) => async ({ data, token }: any) => {
    try {
      const response: any = await Amend.postArgument(
        data.text,
        data.type,
        data.amendID,
        token
      )
      if (response.data) {
        io.emit(`amend/${data.amendID}`, response)
      } else {
        socket.emit('postArgument', response)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
