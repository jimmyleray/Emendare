import React from 'react'
import { ApiContext } from '../../../components'
import { IError, IUser } from '../../../../../interfaces'
import {
  initialState,
  setErrorAuthAction,
  setIsConnectionPendingAction,
  setUserAction,
  userReducer
} from './store'

interface IUserProviderValue {
  user: IUser | null
  isConnectionPending: boolean
  isConnected: any
  logout: any
  register: any
  errorAuth: IError | null
  login: any
}

const UserContext = React.createContext({} as IUserProviderValue)

export const UserProvider = ({ children }: any) => {
  const { Socket } = React.useContext(ApiContext)

  const [state, dispatch] = React.useReducer(userReducer, initialState)

  const isConnected = () => state.user !== null
  const logout = () => {
    localStorage.removeItem('token')
    dispatch(setUserAction(null))
  }
  const register = (email: string, password: string) => {
    dispatch(setIsConnectionPendingAction(true))
    Socket.fetch('subscribe', { email, password })
      .then(() => {
        dispatch(setErrorAuthAction(null))
        return true
      })
      .catch((err: any) => {
        dispatch(setErrorAuthAction(err))
        return false
      })
  }
  const login = (email?: string, password?: string) => {
    dispatch(setIsConnectionPendingAction(true))
    Socket.fetch('login', { email, password })
      .then(({ user, token }: any) => {
        dispatch(setUserAction(user))
        localStorage.setItem('token', token)
        dispatch(setIsConnectionPendingAction(false))
        dispatch(setErrorAuthAction(null))
        return true
      })
      .catch((err: any) => {
        localStorage.removeItem('token')
        dispatch(setIsConnectionPendingAction(false))
        dispatch(setErrorAuthAction(err))
        return false
      })
  }

  React.useEffect(() => {
    Socket.on('user', ({ error, data }: { error: IError; data: IUser }) => {
      if (!error) {
        dispatch(setUserAction(data))
      }
    })

    const token = localStorage.getItem('token')
    if (token) {
      login()
    } else {
      dispatch(setIsConnectionPendingAction(false))
    }

    return () => {
      Socket.off('user')
      Socket.off('login')
      Socket.off('subscribe')
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        ...state,
        logout,
        register,
        isConnected,
        login
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = React.useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used inside the UserProvider')
  }

  return context
}
