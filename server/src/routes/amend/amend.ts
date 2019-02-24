import socketIO from 'socket.io'
import { Amend } from '../../models'

export const amend = {
  name: 'amend',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    data
  }: any) => {
    try {
      const response = await Amend.getAmend(data.id)
      socket.emit('amend/' + data.id, response)
    } catch (error) {
      console.error(error)
    }
  }
}
