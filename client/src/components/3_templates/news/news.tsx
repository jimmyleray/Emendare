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

  const newEventsCount = user && newEvents ? newEvents.length : 0

  React.useEffect(() => {
    if (hasNextPage) {
      Socket.emit('events')
    }
  }, [])

  return (
    <React.Fragment>
      {newEventsCount > 0 && (
        <Button
          className="is-fullwidth is-info"
          style={{ borderRadius: 0 }}
          onClick={() => {
            dispatch({ type: 'NEW_EVENTS_READED' })
          }}
        >
          {translate('MARK_AS_READ')}
        </Button>
      )}

      {events && events.length > 0 && (
        <NewsList
          events={events}
          newEvents={newEvents}
          hasNextPage={hasNextPage}
        />
      )}
    </React.Fragment>
  )
}
