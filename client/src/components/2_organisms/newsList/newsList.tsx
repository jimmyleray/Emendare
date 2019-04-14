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
import { IEvent } from '../../../../../interfaces'
// Helpers
import { isRowLoaded, loadMoreRows, isEventNew } from './helper'

// Interface
interface INewsListProps {
  /** List of events */
  events: IEvent[]
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
const rowRenderer = (events: IEvent[], newEvents: IEvent[]) => ({
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
        <EventRow
          data={events[index]}
          isNew={isEventNew(newEvents, events, index)}
          updateRow={() => {
            // cache.clear(index, 0)
            measure()
          }}
          index={index}
        />
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

  return (
    <div>
      <InfiniteLoader
        isRowLoaded={isRowLoaded(events)}
        loadMoreRows={loadMoreRows(events, hasNextPage)}
        rowCount={events.length}
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
                    rowCount={events.length}
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
  )
}
