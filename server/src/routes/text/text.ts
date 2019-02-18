import socketIO from 'socket.io'
import { Text } from '../../models'

export const text = {
  name: 'text',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    data
  }: any) => {
    socket.emit('text/' + data.id, await Text.getText(data.id))
  }
}
