/* eslint-disable sonarjs/cognitive-complexity */

import React from 'react'
import {
  Button,
  UserContext,
  EventsContext,
  NewsList,
  I18nContext
} from '../../../components'
import { Socket } from '../../../services'

export const News = () => {
  const { translate } = React.useContext(I18nContext)
  const { user } = React.useContext(UserContext)
  const { events, hasNextPage, newEvents, dispatch } = React.useContext(
    EventsContext
  )

  React.useEffect(() => {
    if (hasNextPage) {
      Socket.emit('events')
    }
  }, [])

  if (events.length > 0) {
    const newEventsCount = user ? newEvents.length : 0
    return (
      <div style={{ padding: '0.5rem 0.5rem 0rem 0.5rem' }}>
        {newEventsCount > 0 && (
          <Button
            className="is-fullwidth is-link"
            style={{ marginBottom: '1.5rem' }}
            onClick={() => {
              dispatch({ type: 'NEW_EVENTS_READED' })
            }}
          >
            {translate('MARK_AS_READ')}
          </Button>
        )}
        <NewsList
          events={events}
          newEvents={newEvents}
          hasNextPage={hasNextPage}
        />
      </div>
    )
  } else {
    return null
  }
}
