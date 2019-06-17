/* eslint-disable sonarjs/cognitive-complexity */
import React from 'react'
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized'
import {
  Card,
  Button,
  useUser,
  EventsContext,
  EventRow,
  InfiniteList,
  I18nContext,
  ApiContext
} from '../../../components'
import { INews, IEvent } from '../../../../../interfaces'
// Helpers
import { isRowLoaded, loadMoreRows, isEventNew } from './helper'

interface IEventsListProps {
  events: INews[]
  newEvents: IEvent[]
  hasNextPage: boolean
}

// Default cache for cell mesurement
const cache = new CellMeasurerCache({
  fixedWidth: true
})

const rowRenderer = (events: INews[], newEvents: IEvent[]) => ({
  index,
  parent,
  style,
  key
}: any) => {
  return (
    <CellMeasurer
      key={key}
      cache={cache}
      columnIndex={0}
      rowIndex={index}
      parent={parent}
    >
      {({ measure }: any) => (
        <div style={style}>
          {events[index] ? (
            <EventRow
              data={events[index]}
              isNew={isEventNew(newEvents, events, index)}
              measure={measure}
              index={index}
            />
          ) : null}
        </div>
      )}
    </CellMeasurer>
  )
}

export const EventsList = ({
  events,
  newEvents,
  hasNextPage
}: IEventsListProps) => {
  const { translate } = React.useContext(I18nContext)
  const { user } = useUser()
  const { dispatch } = React.useContext(EventsContext)
  const newEventsCount = user && newEvents ? newEvents.length : 0
  const { Socket } = React.useContext(ApiContext)

  return (
    <React.Fragment>
      {newEventsCount > 0 && (
        <Button
          className="is-fullwidth is-dark"
          style={{ borderRadius: 0 }}
          onClick={() => {
            dispatch({ type: 'NEW_EVENTS_READED' })
          }}
        >
          {translate('MARK_AS_READ')}
        </Button>
      )}

      {events && events.length > 0 ? (
        <InfiniteList
          data={events}
          hasNextPage={hasNextPage}
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows(Socket)}
          rowRenderer={rowRenderer(events, newEvents)}
          cache={cache}
        />
      ) : (
        <Card style={{ padding: '2rem' }}>
          <p className="is-size-5 has-text-centered">
            Aucun évènement en cours dans cette catégorie
          </p>
        </Card>
      )}
    </React.Fragment>
  )
}
