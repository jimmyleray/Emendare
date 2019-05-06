// Dependencies
import React, { useRef } from 'react'
import {
  CellMeasurerCache,
  List,
  InfiniteLoader,
  WindowScroller,
  AutoSizer
} from 'react-virtualized'

// Interface
interface INewsListProps {
  /** List of events */
  data: any[]
  /** Tell if there are more events to be loaded */
  hasNextPage: boolean
  /** tell if the row is loaded  */
  isRowLoaded: (data: any[]) => any
  /** fetch more data from the API */
  loadMoreRows: (data: any[], hasNextPage: boolean) => any
  /** Rendering of the row */
  rowRenderer: any
  /** Cache for cell height and width */
  cache: CellMeasurerCache
}

export const InfiniteList = ({
  data,
  hasNextPage,
  isRowLoaded,
  loadMoreRows,
  rowRenderer,
  cache
}: INewsListProps) => {
  const refList = useRef<any>()
  const rowCount = hasNextPage ? data.length + 1 : data.length

  return data.length > 0 ? (
    <div>
      <InfiniteLoader
        isRowLoaded={isRowLoaded(data)}
        loadMoreRows={loadMoreRows(data, hasNextPage)}
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
                    rowRenderer={rowRenderer}
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
