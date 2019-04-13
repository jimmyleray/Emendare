// Dependencies
import React, { useRef, useState } from 'react'
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

export const NewsList = ({
  events,
  newEvents,
  hasNextPage
}: INewsListProps) => {
  const refList = useRef<any>()
  const [prevWidth, setPrevWidth] = useState(0)

  // Default cache for cell mesurement
  const cache = new CellMeasurerCache({
    fixedWidth: true
  })

  // Resize specific row height
  const resizeRow = (index: number) => {
    cache.clear(index, 0)
    if (refList.current) {
      refList.current.recomputeRowHeights(index)
    }
  }

  // Resize all the rows
  const resizeAll = () => {
    cache.clearAll()
    if (refList.current) {
      refList.current.recomputeRowHeights()
    }
  }

  // Render list item
  const rowRenderer = ({ index, parent, style, key }: any) => {
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        rowIndex={index}
        key={key}
        parent={parent}
      >
        <div style={style}>
          <EventRow
            data={events[index]}
            isNew={isEventNew(newEvents, events, index)}
            resizeRow={resizeRow}
            index={index}
            cache={cache}
          />
        </div>
      </CellMeasurer>
    )
  }

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
              <AutoSizer disableHeight>
                {({ width }) => {
                  if (prevWidth && prevWidth !== width) {
                    setPrevWidth(width)
                    setTimeout(resizeAll, 0)
                  }

                  return (
                    <div>
                      <List
                        scrollTop={scrollTop}
                        ref={refList}
                        onScroll={onChildScroll}
                        width={width}
                        height={height}
                        isScrolling={isScrolling}
                        rowCount={events.length}
                        deferredMeasurementCache={cache}
                        rowHeight={cache.rowHeight}
                        onRowsRendered={onRowsRendered}
                        rowRenderer={rowRenderer}
                        overscanRowCount={0}
                      />
                    </div>
                  )
                }}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    </div>
  )
}
