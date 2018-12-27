import React from 'react'
import { socket } from '../utils'

export const EventsContext = React.createContext()

export class EventsProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: null
    }
  }

  componentDidMount() {
    socket.emit('events')
    socket.on('events', ({ error, data }) => {
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

  render() {
    return (
      <EventsContext.Provider value={this.state}>
        {this.props.children}
      </EventsContext.Provider>
    )
  }
}
