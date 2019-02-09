import socketIO from 'socket.io'
import { Text } from '../../models'

export const text = {
  name: 'text',
  callback: ({ socket }: { socket: socketIO.Socket }) => async ({
    data
  }: any) => {
    const gettedText = await Text.model.findById(data.id)
    if (gettedText) {
      socket.emit('text/' + data.id, { data: gettedText })
    } else {
      socket.emit('text/' + data.id, {
        error: { code: 404, message: "Oups, ce texte n'existe pas ou plus" }
      })
    }
  }
}
