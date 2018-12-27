import React from 'react'
import { EventsContext } from '../contexts'

export const Events = () => (
  <EventsContext.Consumer>
    {({ events }) => (
      <div className="has-text-centered">
        <p className="is-size-3">Fil d'actualités</p>
        {events &&
          events.map(event => (
            <div key={event._id} className="notification">
              {event.title}
            </div>
          ))}
      </div>
    )}
  </EventsContext.Consumer>
)
