import React from 'react'
import { socket } from '../../services'

export const UserContext = React.createContext()

export class UserProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      isConnectionPending: true,
      isConnected: () => this.state.user !== null,
      logout: event => {
        event.preventDefault()
        socket.fetch('logout').then(() => {
          localStorage.removeItem('token')
          this.setState(() => ({ user: null }))
        })
      }
    }
  }

  componentDidMount() {
    socket.on('user', ({ error, data }) => {
      if (!error) {
        this.setState({ user: data })
      }
    })

    const token = localStorage.getItem('token')
    if (token) {
      this.setState({ isConnectionPending: true })
      socket
        .fetch('login')
        .then(user => {
          this.setState({ user, isConnectionPending: false })
        })
        .catch(() => {
          localStorage.removeItem('token')
          this.setState({ isConnectionPending: false })
        })
    } else {
      this.setState({ isConnectionPending: false })
    }
  }

  componentWillUnmount() {
    socket.off('user')
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
