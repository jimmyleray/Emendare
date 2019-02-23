import socketIO from 'socket.io'
import { Text } from '../../models'

export const texts = {
  name: 'texts',
  callback: ({ socket }: { socket: socketIO.Socket }) => async () => {
    try {
      const response = await Text.getTexts()
      socket.emit('texts/all', response)
    } catch (error) {
      console.error(error)
    }
  }
}
