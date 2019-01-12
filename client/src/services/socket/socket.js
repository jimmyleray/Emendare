import io from 'socket.io-client'
import { apiConfig } from '../../config'

// Default Socket.io Instance
const insecureSocket = io(apiConfig.url[process.env.NODE_ENV])

// Overwrited Socket.io Instance
// With fetch method and token prop
export const Socket = {
  on: (name, callback) => {
    return insecureSocket.on(name, callback)
  },
  off: name => {
    return insecureSocket.off(name)
  },
  emit: (name, data = {}) => {
    return insecureSocket.emit(name, {
      token: localStorage.getItem('token'),
      data
    })
  },
  fetch: (name, params) => {
    Socket.emit(name, params)
    return new Promise((resolve, reject) => {
      Socket.on(name, ({ data, error } = {}) => {
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
