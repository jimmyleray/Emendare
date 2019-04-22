/* eslint-disable sonarjs/cognitive-complexity */

import React from 'react'
import {
  Card,
  Button,
  UserContext,
  EventsContext,
  NewsList,
  I18nContext
} from '../../../components'
import { INews, IEvent } from '../../../../../interfaces'

interface IEventsListProps {
  events: INews[]
  newEvents: IEvent[]
  hasNextPage: boolean
}

export const EventsList = ({
  events,
  newEvents,
  hasNextPage
}: IEventsListProps) => {
  const { translate } = React.useContext(I18nContext)
  const { user } = React.useContext(UserContext)
  const { dispatch } = React.useContext(EventsContext)
  const newEventsCount = user && newEvents ? newEvents.length : 0

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

      {events && events.length > 0 ? (
        <NewsList
          events={events}
          newEvents={newEvents}
          hasNextPage={hasNextPage}
        />
      ) : (
        <Card style={{ padding: '2rem' }}>
          <p className="is-size-5 has-text-centered">
            {user
              ? 'Aucun évènement en cours dans cette catégorie'
              : 'Connexion requise pour afficher les évènements'}
          </p>
        </Card>
      )}
    </React.Fragment>
  )
}
