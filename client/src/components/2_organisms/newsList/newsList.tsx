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
  let refList = useRef<any>()
  let registerRefChild: any
  const [mostRecentWidth, setMostRecentWidth] = useState(0)

  /** Default cache for cell mesurement */
  const cache = new CellMeasurerCache({
    fixedWidth: true
  })

  // Update row height post render
  const resizeRow = (index: number) => {
    cache.clear(index, 0)
    if (refList.current) {
      refList.current.recomputeRowHeights(index)
    }
  }

  // resize all the rows
  const resizeAll = () => {
    cache.clearAll()
    if (refList.current) {
      refList.current.recomputeRowHeights()
    }
  }

  // Set ref of the list
  const setListRef = (ref: any) => {
    refList.current = ref
    registerRefChild(ref)
  }

  // If there are more items to be loaded then add an extra row to hold a loading indicator
  const rowCount = events.length + 1

  // Render list item
  const rowRenderer = ({ index, parent, style, key }: any) => {
    return (
      events[index] && (
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
    )
  }

  return (
    <div>
      <InfiniteLoader
        isRowLoaded={({ index }) => isRowLoaded(events, index, hasNextPage)}
        loadMoreRows={() => loadMoreRows(events, 10, Socket, hasNextPage)}
        rowCount={rowCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, isScrolling, scrollTop, onChildScroll }) => (
              <AutoSizer disableHeight>
                {({ width }) => {
                  if (mostRecentWidth && mostRecentWidth !== width) {
                    setTimeout(resizeAll, 0)
                  }
                  setMostRecentWidth(width)
                  registerRefChild = registerChild
                  return (
                    <List
                      scrollTop={scrollTop}
                      ref={setListRef}
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
