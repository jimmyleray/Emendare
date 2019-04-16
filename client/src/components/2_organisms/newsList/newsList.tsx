// Dependencies
import React, { useRef } from 'react'
import {
  CellMeasurerCache,
  List,
  InfiniteLoader,
  WindowScroller,
  CellMeasurer,
  AutoSizer
} from 'react-virtualized'
// Components
import { EventRow } from '../../../components'
// Interfaces
import { IEvent, INews } from '../../../../../interfaces'
// Helpers
import { isRowLoaded, loadMoreRows, isEventNew } from './helper'

// Interface
interface INewsListProps {
  /** List of events */
  events: INews[]
  /** All the new events which havn't been readed yet */
  newEvents: IEvent[]
  /** Tell if there are more events to be loaded */
  hasNextPage: boolean
}

// Default cache for cell mesurement
const cache = new CellMeasurerCache({
  fixedWidth: true
})

// Render list item
const rowRenderer = (events: INews[], newEvents: IEvent[]) => ({
  index,
  parent,
  style,
  key
}: any) => (
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

export const NewsList = ({
  events,
  newEvents,
  hasNextPage
}: INewsListProps) => {
  const refList = useRef<any>()
  const rowCount = hasNextPage ? events.length + 1 : events.length

  return events.length > 0 ? (
    <div>
      <InfiniteLoader
        isRowLoaded={isRowLoaded(events)}
        loadMoreRows={loadMoreRows(events, hasNextPage)}
        rowCount={rowCount}
      >
        {({ onRowsRendered }) => (
          <WindowScroller>
            {({ height, isScrolling, scrollTop, onChildScroll }) => (
              <AutoSizer
                disableHeight
                onResize={() => {
                  cache.clearAll()
                  if (refList && refList.current) {
                    refList.current.recomputeRowHeights()
                  }
                }}
              >
                {({ width }) => (
                  <List
                    autoHeight
                    scrollTop={scrollTop}
                    ref={refList}
                    onScroll={onChildScroll}
                    width={width}
                    height={height}
                    isScrolling={isScrolling}
                    rowCount={rowCount}
                    deferredMeasurementCache={cache}
                    rowHeight={cache.rowHeight}
                    estimatedRowSize={200}
                    onRowsRendered={onRowsRendered}
                    rowRenderer={rowRenderer(events, newEvents)}
                    overscanRowCount={0}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    </div>
  ) : null
}
