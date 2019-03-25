import socketIO from 'socket.io'
import config from '../../config'

// Fetch API polyfills
import fetch from 'node-fetch'

export const contributors = {
  name: 'contributors',
  callback: ({ socket }: { socket: socketIO.Socket }) => async () => {
    try {
      const res = await fetch(config.contributions.apiUrl)
      let data = await res.json()
      data = data.map((item: any) => {
        if (config.contributions.listPlugins.includes(item.login)) {
          item.type = 'Bot'
        }
        return item
      })
      socket.emit('contributors', { data })
    } catch (error) {
      console.error(error)
      socket.emit('contributors', { error })
    }
  }
}
