import React from 'react'
import { useComponentSize } from '../../../hooks'
import { EventRow } from '../../../components'
import { CellMeasurerCache, WindowScroller, List } from 'react-virtualized'
import { IEvent } from '../../../../../interfaces'

interface INewsListProps {
  /** List of events */
  events: IEvent[]
  /** Date of the last event */
  lastEventDate: number | null
  /** The number of new events */
  newEventsCount: number | null
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
  newEventsCount
}: INewsListProps) => {
  const { ref, width } = useComponentSize()

  /** Default cache for cell mesurement */
  const cache = new CellMeasurerCache({
    defaultHeight: 70,
    fixedWidth: true
  })

  return (
    <div ref={ref}>
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <List
            autoHeight
            width={width}
            rowCount={events.length}
            itemData={events}
            height={height}
            deferredMeasurementCache={cache}
            rowHeight={cache.rowHeight}
            isScrolling={isScrolling}
            onScroll={onChildScroll}
            scrollTop={scrollTop}
            rowRenderer={props => (
              <EventRow
                data={events[props.index]}
                isNew={isEventNew(
                  lastEventDate,
                  newEventsCount,
                  events,
                  props.index
                )}
                cache={cache}
                parent={props.parent}
                key={props.index}
                index={props.index}
                style={props.style}
                {...props}
              />
            )}
          />
        )}
      </WindowScroller>
    </div>
  )
}
