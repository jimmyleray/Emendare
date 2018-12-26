import io from 'socket.io-client'

const config = {
  url: {
    development: 'http://localhost:3030',
    production: 'https://emendare-api.cleverapps.io'
  }
}

export const apiFetch = (pathname, options = {}) => {
  return fetch(config.url[process.env.NODE_ENV] + pathname, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      token: localStorage.getItem('token')
    }
  })
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
  fetch: name => {
    socket.emit(name)
    return new Promise((resolve, reject) => {
      socket.on(name, ({ data, error }) => {
        socket.off(name)
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
