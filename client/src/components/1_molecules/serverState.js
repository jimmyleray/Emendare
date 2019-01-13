import React from 'react'
import { Icon } from '../../components'
import { Socket } from '../../services'

export class ServerState extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ping: null
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.sendPing()
    }, 5000)

    Socket.on('customPong', start => {
      const finish = new Date().getTime()
      this.setState({ ping: finish - start })
    })

    this.sendPing()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    Socket.off('customPong')
  }

  sendPing() {
    const now = new Date().getTime()
    Socket.emit('customPing', now)
  }

  render() {
    return (
      <p className="has-text-weight-semibold">
        <Icon
          className={
            'fas fa-circle ' +
            (this.state.ping
              ? this.state.ping < 200
                ? 'has-text-success'
                : this.state.ping < 500
                ? 'has-text-warning'
                : 'has-text-danger'
              : 'has-text-light')
          }
          title={(this.state.ping ? this.state.ping : '?') + ' ms'}
        />
        Etat du serveur
      </p>
    )
  }
}
