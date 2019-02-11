import io from 'socket.io-client'
import { apiConfig } from '../../config'

// Default Socket.io Instance
const insecureSocket = io(apiConfig.url[process.env.DEPLOY_ENV || 'local'])

// Overwrited Socket.io Instance
// With fetch method and token prop
export const Socket = {
  on: (name: string, callback: any) => {
    return insecureSocket.on(name, callback)
  },
  off: (name: string) => {
    return insecureSocket.off(name)
  },
  emit: (name: string, data = {}) => {
    return insecureSocket.emit(name, {
      token: localStorage.getItem('token'),
      data
    })
  },
  fetch: (name: string, params = {}) => {
    Socket.emit(name, params)
    return new Promise((resolve, reject) => {
      Socket.on(name, ({ data, error }: any = {}) => {
        if (error) {
          console.warn(name, error)
          reject(error)
        } else {
          resolve(data)
        }
      })
    })
  }
}
