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
      'user-token': localStorage.getItem('user-token')
    }
  })
}

export const socket = io(config.url[process.env.NODE_ENV])
