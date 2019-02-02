import React from 'react'
import { Socket } from '../../services'

export const DataContext = React.createContext({} as IDataProviderState)

interface IDataProviderState {
  memo: any
  listeners: string[]
  get: (type: string) => (id: string) => any
}

export class DataProvider extends React.Component<{}, IDataProviderState> {
  constructor(props: {}) {
    super(props)

    this.state = {
      memo: {},
      listeners: [],
      get: type => id => {
        const listener = [type, id].join('/')
        if (this.state.memo[type] && this.state.memo[type][id]) {
          return this.state.memo[type][id]
        } else if (!this.state.listeners.includes(listener)) {
          Socket.on(listener, ({ error, data }: any) => {
            this.setState(
              prevState => ({
                ...prevState,
                memo: {
                  ...prevState.memo,
                  [type]: { ...prevState.memo[type], [id]: { error, data } }
                }
              }),
              () => {
                Socket.emit('user')
              }
            )
          })
          this.setState(
            prevState => ({
              ...prevState,
              listeners: [...new Set([...prevState.listeners, listener])]
            }),
            () => {
              Socket.emit(type, { id })
            }
          )
        }
      }
    }
  }

  public componentWillUnmount() {
    this.state.listeners.forEach(listener => {
      Socket.off(listener)
    })
  }

  public render() {
    return (
      <DataContext.Provider value={this.state}>
        {this.props.children}
      </DataContext.Provider>
    )
  }
}
