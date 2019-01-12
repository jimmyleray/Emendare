import React from 'react'
import { Socket } from '../../services'

export const EventsContext = React.createContext()

export class EventsProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: []
    }
  }

  componentDidMount() {
    Socket.emit('events')
    Socket.on('events', ({ error, data }) => {
      if (!error) {
        this.setState({
          events: data.map(event => ({
            ...event,
            target: event.target ? JSON.parse(event.target) : null
          }))
        })
      }
    })
  }

  componentWillUnmount() {
    Socket.off('events')
  }

  render() {
    return (
      <EventsContext.Provider value={this.state}>
        {this.props.children}
      </EventsContext.Provider>
    )
  }
}
