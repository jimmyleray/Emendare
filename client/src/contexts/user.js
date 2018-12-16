import React from 'react'

export const UserContext = React.createContext()

export class UserProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: 0,
      incrementAmount: () => {
        this.setState(state => ({
          amount: state.amount + 1
        }))
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
