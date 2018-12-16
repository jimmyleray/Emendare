import React from 'react'

export const UserContext = React.createContext()

export class UserProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      login: newUser => {
        this.setState(state => ({ user: newUser }))
      },
      logout: () => {
        this.setState(state => ({ user: null }))
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
