import io from 'socket.io-client'

// Default Socket.io Instance
const insecureSocket = io(
  process.env.REACT_APP_API_URL || 'http://localhost:3030'
)

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
      Socket.on(name, (res: any) => {
        if (res && res.error) {
          console.warn(name, res.error)
          reject(res.error)
        } else {
          resolve(res && res.data)
        }
        if (name !== 'user') {
          Socket.off(name)
        }
      })
    })
  }
}
