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
  const { events, hasNextPage } = React.useContext(EventsContext)

  const lastEventDate = user && new Date(user.lastEventDate).getTime()

  React.useEffect(() => {
    Socket.emit('events')
  }, [])

  if (events.length > 0) {
    const newEventsCount = user
      ? events.filter(
          (event: any) =>
            new Date(event.created).getTime() >
            new Date(user.lastEventDate).getTime()
        ).length
      : 0

    return (
      <React.Fragment>
        {newEventsCount > 0 && (
          <Button
            className="is-fullwidth is-link"
            style={{ marginBottom: '1.5rem' }}
            onClick={() => {
              Socket.emit('updateLastEventDate')
            }}
          >
            {translate('MARK_AS_READ')}
          </Button>
        )}
        <NewsList
          events={events}
          lastEventDate={lastEventDate}
          newEventsCount={newEventsCount}
          hasNextPage={hasNextPage}
        />
      </React.Fragment>
    )
  } else {
    return null
  }
}
