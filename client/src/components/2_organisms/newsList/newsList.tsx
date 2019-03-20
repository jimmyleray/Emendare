// Dependencies
import React from 'react'
import {
  CellMeasurerCache,
  List,
  InfiniteLoader,
  WindowScroller
} from 'react-virtualized'
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
  /** All the new events which havn't been readed yet */
  newEvents: IEvent[]
  /** Tell if there are more events to be loaded */
  hasNextPage: boolean
}

const isEventNew = (newEvents: IEvent[], events: IEvent[], index: number) => {
  return newEvents.length > 0 && events.length > 0 && events[index + 1]
    ? newEvents.map((event: IEvent) => event._id).indexOf(events[index]._id) ===
        0
    : false
}

export const NewsList = ({
  events,
  newEvents,
  hasNextPage
}: INewsListProps) => {
  const { ref, width } = useComponentSize()
  /** Default cache for cell mesurement */
  const cache = new CellMeasurerCache({
    defaultHeight: 70,
    fixedWidth: true
  })

  // If there are more items to be loaded then add an extra row to hold a loading indicator
  const rowCount = () => (hasNextPage ? events.length + 1 : events.length)

  // Render list item or loading indicator
  const rowRenderer = ({ index, parent, style, key, ...rest }: any) => {
    return (
      <EventRow
        data={events[index]}
        isNew={isEventNew(newEvents, events, index)}
        isLast={index === events.length - 1}
        cache={cache}
        parent={parent}
        index={index}
        style={style}
        key={key}
        {...rest}
      />
    )
  }

  return (
    <div ref={ref}>
      <InfiniteLoader
        isRowLoaded={({ index }) => isRowLoaded(events, index, hasNextPage)}
        loadMoreRows={() => loadMoreRows(events, 15, Socket, hasNextPage)}
        rowCount={rowCount()}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <List
                autoHeight
                width={width}
                rowCount={rowCount()}
                itemData={events}
                height={height}
                onRowsRendered={onRowsRendered}
                ref={registerChild}
                deferredMeasurementCache={cache}
                rowHeight={cache.rowHeight}
                rowRenderer={rowRenderer}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
              />
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    </div>
  )
}
