import React from 'react'
import { ApiContext } from '../../../components'
import { IError, IUser } from '../../../../../interfaces'

interface IUserProviderState {
  user: IUser | null
  isConnectionPending: boolean
  isConnected: any
  logout: any
}

export const UserContext = React.createContext({} as IUserProviderState)

export const UserProvider = ({ children }: any) => {
  const { Socket } = React.useContext(ApiContext)
  const [user, setUser] = React.useState<IUser | null>(null)
  const [isConnectionPending, setIsConnectionPending] = React.useState(true)

  const isConnected = () => user !== null
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  React.useEffect(() => {
    Socket.on('user', ({ error, data }: { error: IError; data: IUser }) => {
      if (!error) {
        setUser(data)
      }
    })

    const token = localStorage.getItem('token')
    if (token) {
      Socket.fetch('login')
        .then(({ user }: any) => {
          setUser(user)
          setIsConnectionPending(false)
        })
        .catch(() => {
          localStorage.removeItem('token')
          setIsConnectionPending(false)
        })
    } else {
      setIsConnectionPending(false)
    }

    return () => {
      Socket.off('user')
      Socket.off('login')
    }
  }, [])

  return (
    <UserContext.Provider
      value={{ user, isConnected, isConnectionPending, logout }}
    >
      {children}
    </UserContext.Provider>
  )
}
