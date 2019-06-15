import socketIO from 'socket.io'
import { Text } from '../../models'

export const text = {
  name: 'text',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    data
  }: any) => {
    try {
      const response = await Text.getText(data.id)
      socket.emit('text/' + data.id, response)
    } catch (error) {
      console.error(error)
    }
  }
}
