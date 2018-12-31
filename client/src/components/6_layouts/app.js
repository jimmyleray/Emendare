import React from 'react'
import { Providers, Router } from '../../components'
import { socket } from '../../services'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { key: 0 }
  }

  componentDidMount() {
    // Re-render application on reconnect
    socket.on('connect', () => {
      this.setState({ key: this.state.key + 1 })
    })
  }

  componentWillUnmount() {
    socket.off('connect')
  }

  render() {
    return (
      <div key={this.state.key}>
        <Providers>
          <Router />
        </Providers>
      </div>
    )
  }
}
