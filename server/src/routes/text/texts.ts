import socketIO from 'socket.io'
import { Text } from '../../models'

export const texts = {
  name: 'texts',
  callback: ({ socket }: { socket: socketIO.Socket }) => async () => {
    const gettedTexts = await Text.model.find({ rules: false })
    if (gettedTexts) {
      socket.emit('texts/all', {
        data: gettedTexts.map((text: any) => text._id)
      })
    } else {
      socket.emit('texts/all', {
        error: { code: 405, message: "Oups, il y'a eu une erreur" }
      })
    }
  }
}
