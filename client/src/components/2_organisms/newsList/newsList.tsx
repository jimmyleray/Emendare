// Dependencies
import React from 'react'
import { CellMeasurerCache, List, InfiniteLoader } from 'react-virtualized'
// Components
import { useComponentSize } from '../../../hooks'
import { EventRow } from '../../../components'
// Interfaces
import { IEvent } from '../../../../../interfaces'
// Helpers
import { isRowLoaded, loadMoreRows } from './helper'
// Services
import { Socket } from '../../../services'

interface INewsListProps {
  /** List of events */
  events: IEvent[]
  /** Date of the last event */
  lastEventDate: number | null
  /** The number of new events */
  newEventsCount: number | null
  /** Tell if there are more events to be loaded */
  hasNextPage: boolean
}

const isEventNew = (
  lastEventDate: number | null,
  newEventsCount: number | null,
  events: IEvent[],
  index: number
) => {
  return Boolean(
    lastEventDate &&
      newEventsCount &&
      events[index + 1] &&
      new Date(events[index].created).getTime() > lastEventDate &&
      new Date(events[index + 1].created).getTime() < lastEventDate
  )
}

export const NewsList = ({
  events,
  lastEventDate,
  newEventsCount,
  hasNextPage
}: INewsListProps) => {
  const { ref, width } = useComponentSize()

  /** Default cache for cell mesurement */
  const cache = new CellMeasurerCache({
    defaultHeight: 70,
    fixedWidth: true
  })

  // If there are more items to be loaded then add an extra row to hold a loading indicator
  const rowCount = () => {
    if (events.length !== 0) {
      return hasNextPage ? events.length + 1 : events.length
    }
    return 10
  }

  // Render list item or loading indicator
  const rowRenderer = ({ index, parent, style, key, ...rest }: any) => {
    return (
      <EventRow
        data={events[index]}
        isNew={isEventNew(lastEventDate, newEventsCount, events, index)}
        isLast={index === events.length - 1}
        cache={cache}
        parent={parent}
        index={index}
        style={style}
        keyRow={key}
        key={key}
        {...rest}
      />
    )
  }

  return (
    <div ref={ref}>
      <InfiniteLoader
        isRowLoaded={({ index }) => isRowLoaded(events, index, hasNextPage)}
        loadMoreRows={() => loadMoreRows(events, 10, Socket, hasNextPage)}
        rowCount={rowCount()}
      >
        {({ onRowsRendered, registerChild }) => (
          <List
            autoHeight
            width={width}
            rowCount={rowCount()}
            itemData={events}
            height={500}
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            deferredMeasurementCache={cache}
            rowHeight={cache.rowHeight}
            rowRenderer={rowRenderer}
          />
        )}
      </InfiniteLoader>
    </div>
  )
}
