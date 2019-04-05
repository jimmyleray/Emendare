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
// Services
import { Socket } from '../../../services'

// Interface
interface INewsListProps {
  /** List of events */
  events: IEvent[]
  /** All the new events which havn't been readed yet */
  newEvents: IEvent[]
  /** Tell if there are more events to be loaded */
  hasNextPage: boolean
}

export const NewsList = ({
  events,
  newEvents,
  hasNextPage
}: INewsListProps) => {
  const refList: any = useRef()
  /** Default cache for cell mesurement */
  const cache = new CellMeasurerCache({
    fixedWidth: true
  })

  const updateRow = (index: number) => {
    refList.current.recomputeRowHeights(index)
    refList.current.forceUpdateGrid()
  }

  // If there are more items to be loaded then add an extra row to hold a loading indicator
  const rowCount = events.length + 1

  // Render list item
  const rowRenderer = ({ index, parent, style, key }: any) => {
    return (
      <CellMeasurer cache={cache} rowIndex={index} {...{ key, parent }}>
        {({ measure }) => (
          <div style={{ padding: '0.3em', ...style }} key={key}>
            <EventRow
              data={events[index]}
              isNew={isEventNew(newEvents, events, index)}
              measure={measure}
              updateRow={updateRow}
              index={index}
            />
          </div>
        )}
      </CellMeasurer>
    )
  }

  return (
    <div>
      <InfiniteLoader
        isRowLoaded={({ index }) => isRowLoaded(events, index, hasNextPage)}
        loadMoreRows={() => loadMoreRows(events, 15, Socket, hasNextPage)}
        rowCount={rowCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, isScrolling, scrollTop, onChildScroll }) => (
              <AutoSizer>
                {({ width }) => (
                  <List
                    scrollTop={scrollTop}
                    ref={refList}
                    onScroll={onChildScroll}
                    autoHeight
                    width={width}
                    height={height}
                    isScrolling={isScrolling}
                    rowCount={rowCount}
                    deferredMeasurementCache={cache}
                    rowHeight={cache.rowHeight}
                    onRowsRendered={onRowsRendered}
                    rowRenderer={rowRenderer}
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
