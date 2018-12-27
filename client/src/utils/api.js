import io from 'socket.io-client'

const config = {
  url: {
    development: 'http://localhost:3030',
    production: 'https://emendare-api.cleverapps.io'
  }
}

const insecureSocket = io(config.url[process.env.NODE_ENV])

export const socket = {
  on: (name, callback) => {
    return insecureSocket.on(name, callback)
  },
  emit: (name, data = {}) => {
    return insecureSocket.emit(name, {
      token: localStorage.getItem('token'),
      data
    })
  },
  fetch: (name, params) => {
    socket.emit(name, params)
    return new Promise((resolve, reject) => {
      socket.on(name, ({ data, error } = {}) => {
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
