import React from 'react'
import { ApiContext } from '../../../components'

export const DataContext = React.createContext({} as IDataProviderState)

interface IDataProviderState {
  memo: any
  listeners: string[]
  get: (type: string) => (id: string) => any
}

interface IDataProviderProps {
  Socket: any
}

export const DataProvider = ({ children }: any) => {
  const { Socket } = React.useContext(ApiContext)
  return <DataProviderCore Socket={Socket}>{children}</DataProviderCore>
}

class DataProviderCore extends React.Component<
  IDataProviderProps,
  IDataProviderState
> {
  private Socket: any

  constructor(props: IDataProviderProps) {
    super(props)
    this.Socket = props.Socket

    this.state = {
      memo: {},
      listeners: [],
      get: type => id => {
        const listener = [type, id].join('/')
        if (this.state.memo[type] && this.state.memo[type][id]) {
          return this.state.memo[type][id]
        } else if (!this.state.listeners.includes(listener)) {
          this.Socket.on(listener, ({ error, data }: any) => {
            this.setState(
              prevState => {
                const newState = { ...prevState }
                if (!newState.memo[type]) {
                  newState.memo[type] = {}
                }
                newState.memo[type][id] = { error, data }
                return newState
              },
              () => {
                this.Socket.emit('user')
              }
            )
          })
          this.setState(
            prevState => ({
              ...prevState,
              listeners: [
                ...new Set<string>([...prevState.listeners, listener])
              ]
            }),
            () => {
              this.Socket.emit(type, { id })
            }
          )
        }
      }
    }
  }

  public componentWillUnmount() {
    this.state.listeners.forEach(this.Socket.off)
  }

  public render() {
    return (
      <DataContext.Provider value={this.state}>
        {this.props.children}
      </DataContext.Provider>
    )
  }
}
