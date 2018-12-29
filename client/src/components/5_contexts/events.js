import React from 'react'
import { socket } from '../../services'

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

  componentWillUnmount() {
    socket.off('events')
  }

  render() {
    return (
      <EventsContext.Provider value={this.state}>
        {this.props.children}
      </EventsContext.Provider>
    )
  }
}
