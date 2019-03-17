/* eslint-disable sonarjs/cognitive-complexity */

import React from 'react'
import {
  Button,
  Divider,
  DataContext,
  UserContext,
  NewsList,
  I18nContext
} from '../../../components'
import { Socket } from '../../../services'

export const News = () => {
  const { translate } = React.useContext(I18nContext)
  const { user } = React.useContext(UserContext)
  const { get } = React.useContext(DataContext)

  const lastEventDate = user && new Date(user.lastEventDate).getTime()
  const events = get('events')('all')

  if (events && events.data) {
    const newEventsCount = user
      ? events.data.filter(
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
        <Divider
          content={
            newEventsCount > 0
              ? translate('NEW_EVENTS')
              : translate('EVENTS_LIST')
          }
        />
        <NewsList
          events={events.data}
          lastEventDate={lastEventDate}
          newEventsCount={newEventsCount}
        />
      </React.Fragment>
    )
  } else {
    return null
  }
}
