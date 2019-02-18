import socketIO from 'socket.io'
import { Text } from '../../models'

export const texts = {
  name: 'texts',
  callback: ({ socket }: { socket: socketIO.Socket }) => async () => {
    socket.emit('texts/all', await Text.getTexts())
  }
}
