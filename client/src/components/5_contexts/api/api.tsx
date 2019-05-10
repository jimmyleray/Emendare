import React from 'react'
import io from 'socket.io-client'

interface IapiProviderProps {
  children: React.ReactNode
}

const getSocket = (apiUrl: string) => {
  // Default Socket.io Instance
  const insecureSocket = io(apiUrl)

  // Overwrited Socket.io Instance
  // With fetch method and token prop
  const secureSocket = {
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
      secureSocket.emit(name, params)
      return new Promise((resolve, reject) => {
        secureSocket.on(name, (res: any) => {
          if (res && res.error) {
            console.warn(name, res.error)
            reject(res.error)
          } else {
            resolve(res && res.data)
          }
          if (name !== 'user') {
            secureSocket.off(name)
          }
        })
      })
    }
  }

  return secureSocket
}

export const ApiContext = React.createContext<any>({})

export const ApiProvider = ({ children }: IapiProviderProps) => {
  const [apiUrl, setApiUrl] = React.useState(
    process.env.REACT_APP_API_URL || 'http://localhost:3030'
  )
  const [Socket, setSocket] = React.useState<any>(getSocket(apiUrl))

  return (
    <ApiContext.Provider value={{ Socket, apiUrl, setApiUrl }}>
      {children}
    </ApiContext.Provider>
  )
}
