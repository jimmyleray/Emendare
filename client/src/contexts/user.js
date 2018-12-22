import React from 'react'

export const UserContext = React.createContext()

export class UserProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      isConnected: () => this.state.user !== null,
      login: user => {
        localStorage.setItem('user-token', user.token)
        this.setState(() => ({ user }))
      },
      logout: () => {
        localStorage.removeItem('user-token')
        this.setState(() => ({ user: null }))
      }
    }
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
