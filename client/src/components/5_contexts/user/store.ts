import { IUser, IError } from '../../../../../interfaces'

// State
export interface IUserProviderState {
  user: IUser | null
  isConnectionPending: boolean
  isConnected: any
  errorAuth: IError | null
}

export const initialState: any = {
  user: null,
  isConnectionPending: false,
  isConnected: false,
  errorAuth: null
}

// Reducer
export const userReducer = (
  state: IUserProviderState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'SET_ERROR': {
      return {
        ...state,
        errorAuth: action.payload
      }
    }
    case 'IS_CONNECTION_PENDING':
      return {
        ...state,
        isConnectionPending: action.payload
      }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}
// Actions
export const setUserAction = (data: IUser | null) => ({
  type: 'SET_USER',
  payload: data
})
export const setErrorAuthAction = (error: IError | null) => ({
  type: 'SET_ERROR',
  payload: error
})
export const setIsConnectionPendingAction = (isPending: boolean) => ({
  type: 'IS_CONNECTION_PENDING',
  payload: isPending
})
