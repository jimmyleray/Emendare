import React from 'react'
// Components
import {
  EventsList,
  Page,
  I18nContext,
  UserContext,
  DataContext,
  EventsContext,
  Link,
  Button,
  Icon
} from '../../../components'
// Services
import { Socket } from '../../../services'
// Helpers
import {
  getListTargets,
  filterEventsByUserTextFollowed
} from '../../../helpers'
import { path } from '../../../config'

export const TextsPage = () => {
  const { translate } = React.useContext(I18nContext)
  const { user } = React.useContext(UserContext)
  const { get } = React.useContext(DataContext)
  const { events, hasNextPage, newEvents } = React.useContext(EventsContext)

  const eventsTargets = getListTargets(
    events.filter(event => event.target.type === 'text'),
    get
  )

  const filteredEvents = user
    ? filterEventsByUserTextFollowed(eventsTargets, user)
    : []

  React.useEffect(() => {
    if (hasNextPage) {
      Socket.emit('events')
    }
  }, [])

  return (
    <>
      <Link to={path.create}>
        <Button
          className="is-info is-fullwidth"
          style={{ marginBottom: '1rem' }}
        >
          <Icon name="fa-plus" />
          <span>{translate('ADD_A_TEXT')}</span>
        </Button>
      </Link>
      <Page title={translate('HOME')} style={{ padding: 0 }}>
        <EventsList
          events={filteredEvents}
          newEvents={newEvents}
          hasNextPage={hasNextPage}
        />
      </Page>
    </>
  )
}
