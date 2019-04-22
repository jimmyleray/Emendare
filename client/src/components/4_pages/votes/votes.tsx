import React from 'react'
// Components
import {
  EventsList,
  Page,
  I18nContext,
  UserContext,
  DataContext,
  EventsContext
} from '../../../components'
// Services
import { Socket } from '../../../services'
// Helpers
import {
  getListTargets,
  filterEventsByUserTextFollowed
} from '../../../helpers'

export const VotesPage = () => {
  const { translate } = React.useContext(I18nContext)
  const { user } = React.useContext(UserContext)
  const { get } = React.useContext(DataContext)
  const { events, hasNextPage, newEvents } = React.useContext(EventsContext)

  const eventsTargets = getListTargets(
    events.filter(event => event.target.type === 'amend'),
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
    <Page title={translate('HOME')} style={{ padding: 0 }}>
      <EventsList
        events={filteredEvents}
        newEvents={newEvents}
        hasNextPage={hasNextPage}
      />
    </Page>
  )
}
