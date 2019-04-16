/* eslint-disable sonarjs/cognitive-complexity */

import React from 'react'
import {
  Button,
  UserContext,
  EventsContext,
  NewsList,
  I18nContext,
  DataContext
} from '../../../components'
// Services
import { Socket } from '../../../services'
// Helpers
import {
  getListTargets,
  filterEventsByUserTextFollowed,
  isTargetLoaded
} from '../../../helpers'

export const News = () => {
  const { translate } = React.useContext(I18nContext)
  const { user } = React.useContext(UserContext)
  const { get } = React.useContext(DataContext)
  const { events, hasNextPage, newEvents, dispatch } = React.useContext(
    EventsContext
  )

  const eventsTargets: any = getListTargets(events, get)

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

      {eventsTargets && eventsTargets.length > 0 && (
        <NewsList
          events={filterEventsByUserTextFollowed(eventsTargets, user)}
          newEvents={newEvents}
          hasNextPage={hasNextPage}
        />
      )}
    </React.Fragment>
  )
}
